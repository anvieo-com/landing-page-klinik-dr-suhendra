'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Volume2, 
  VolumeX, 
  Square, 
  X, 
  RotateCcw, 
  Sparkles, 
  MessageCircle, 
  PhoneCall, 
  ChevronDown, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

const QUICK_PROMPTS = [
  { label: '🏥 6 Cabang & Lokasi', query: 'Di mana saja lokasi 6 cabang Klinik dr. Suhendra dan jam operasionalnya?' },
  { label: '👨‍⚕️ Jadwal Dokter', query: 'Bagaimana jadwal dokter umum dan dokter gigi hari ini?' },
  { label: '🚑 IGD & Rawat Inap', query: 'Cabang mana yang menyediakan IGD 24 Jam dan fasilitas rawat inap?' },
  { label: '💳 BPJS & Biaya', query: 'Apakah Klinik dr. Suhendra menerima BPJS Kesehatan dan asuransi?' },
];

export default function DeraAIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: 'Halo! Saya **Dera AI**, asisten medis pintar dari **Klinik dr. Suhendra** 👋\n\nSaya siap memberikan informasi akurat seputar:\n- 🏥 Rute & lokasi 6 cabang di Bogor Barat\n- ⏰ Layanan IGD 24 Jam & Poli Spesialis/Umum\n- 🛏️ Rawat inap, kebidanan KIA, laboratorium & apotek\n- 📋 Pendaftaran antrean dokter\n\nAda yang bisa Dera bantu untuk kesehatan Anda atau keluarga hari ini?',
      timestamp: 'Baru saja'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState(null);
  const [audioLoadingId, setAudioLoadingId] = useState(null);
  const [showTooltip, setShowTooltip] = useState(true);
  const [sessionId, setSessionId] = useState('');

  const chatEndRef = useRef(null);
  const audioRef = useRef(null);
  const inputRef = useRef(null);

  // Inisialisasi session_id unik pada client session
  useEffect(() => {
    try {
      let storedSession = window.sessionStorage.getItem('dera_session_id');
      if (!storedSession) {
        storedSession = `dera-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        window.sessionStorage.setItem('dera_session_id', storedSession);
      }
      setSessionId(storedSession);
    } catch {
      setSessionId(`dera-${Date.now()}`);
    }

    // Auto-hide tooltip setelah 12 detik jika user belum klik
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input saat widget dibuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    } else {
      stopAudio();
    }
  }, [isOpen]);

  // Hentikan audio jika komponen unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const stopAudio = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.src = '';
      } catch (e) {
        // ignore
      }
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
    }
    setPlayingMessageId(null);
    setAudioLoadingId(null);
  };

  // Browser Speech Synthesis Fallback (id-ID voice)
  const playBrowserSpeech = (text, messageId) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setPlayingMessageId(null);
      setAudioLoadingId(null);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      // Bersihkan karakter simbol, markdown, asterik, dan emoji
      const cleanText = text
        .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
        .replace(/[*_#`~-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.rate = 1.05;

      // Cari suara bahasa Indonesia jika ada
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID'));
      if (idVoice) utterance.voice = idVoice;

      utterance.onstart = () => {
        setAudioLoadingId(null);
        setPlayingMessageId(messageId);
      };

      utterance.onend = () => {
        setPlayingMessageId(null);
      };

      utterance.onerror = () => {
        setPlayingMessageId(null);
        setAudioLoadingId(null);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Browser speech synthesis error:', err);
      setPlayingMessageId(null);
      setAudioLoadingId(null);
    }
  };

  // Handle Play/Stop TTS
  const handleToggleSpeak = async (text, messageId) => {
    // Jika sedang play pesan yang sama, hentikan
    if (playingMessageId === messageId) {
      stopAudio();
      return;
    }

    stopAudio();
    setAudioLoadingId(messageId);

    try {
      // Panggil server-side route handler /api/dera-tts
      const response = await fetch('/api/dera-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          speed: 1.05,
        }),
      });

      const contentType = response.headers.get('content-type') || '';

      if (response.ok && contentType.includes('audio')) {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.oncanplaythrough = () => {
          setAudioLoadingId(null);
          setPlayingMessageId(messageId);
          audio.play().catch(() => {
            playBrowserSpeech(text, messageId);
          });
        };

        audio.onended = () => {
          setPlayingMessageId(null);
          URL.revokeObjectURL(audioUrl);
        };

        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          playBrowserSpeech(text, messageId);
        };
      } else {
        // Fallback ke browser speech synthesis jika server mengembalikan fallback flag
        playBrowserSpeech(text, messageId);
      }
    } catch (err) {
      console.warn('Garda TTS proxy unreachable, falling back to browser speech:', err);
      playBrowserSpeech(text, messageId);
    }
  };

  // Handle pengiriman chat
  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const newMessages = [
      ...messages,
      {
        id: userMsgId,
        role: 'user',
        content: query,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
    ];

    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Panggil server-side proxy route /api/dera-chat (Aman: tanpa kredensial di frontend)
      const res = await fetch('/api/dera-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          session_id: sessionId,
        }),
      });

      const data = await res.json();
      const replyText = data.reply || 'Maaf, Dera AI sedang mengalami sedikit kendala jaringan. Anda dapat langsung menghubungi WhatsApp IGD Klinik dr. Suhendra di 0823-1118-8250.';
      const aiMsgId = `ai-${Date.now()}`;

      setMessages(prev => [
        ...prev,
        {
          id: aiMsgId,
          role: 'assistant',
          content: replyText,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      // Jika audio tidak dimute, otomatis bacakan respon Dera AI
      if (!isMuted) {
        setTimeout(() => {
          handleToggleSpeak(replyText, aiMsgId);
        }, 300);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsgId = `ai-err-${Date.now()}`;
      setMessages(prev => [
        ...prev,
        {
          id: errorMsgId,
          role: 'assistant',
          content: 'Koneksi ke asisten Dera AI terputus sesaat. Jangan khawatir, tim medis kami siaga 24 Jam di WhatsApp: **0823-1118-8250**.',
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    stopAudio();
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: 'Percakapan telah direset. Silakan tanyakan informasi klinik, lokasi cabang, atau jadwal dokter yang ingin Anda ketahui! 😊',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Helper render format teks sederhana (bold, list, bullet)
  const renderFormattedText = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Format bold markdown **teks**
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const parsedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-semibold text-navy-950">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-700 my-0.5 leading-relaxed">
            {parsedLine}
          </li>
        );
      }

      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="my-1 leading-relaxed text-slate-700">
          {parsedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* ========================================================
          1. FLOATING BUTTON & GLOWING ANIMATED ORB (BOTTOM-RIGHT)
         ======================================================== */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        
        {/* Tooltip sambutan cerdas (bisa ditutup oleh user) */}
        {!isOpen && showTooltip && (
          <div className="mb-3 mr-1 relative animate-bounce-subtle">
            <div className="bg-navy-950 text-white px-3.5 py-2.5 rounded-2xl shadow-navy border border-blue-500/30 text-xs sm:text-sm max-w-[240px] relative flex items-start gap-2">
              <span className="text-base leading-none">👋</span>
              <div>
                <p className="font-bold text-blue-300">Tanya Dera AI</p>
                <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
                  Asisten medis 24 Jam. Konsultasi jadwal & 6 cabang klinik!
                </p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-slate-400 hover:text-white p-0.5 transition"
                title="Tutup pesan"
                aria-label="Tutup pesan sambutan"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              {/* Panah tooltip ke arah tombol */}
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-navy-950 border-r border-b border-blue-500/30 transform rotate-45" />
            </div>
          </div>
        )}

        {/* Tombol Utama Dera AI */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="relative group p-0.5 rounded-full focus:outline-none transition-all duration-300 active:scale-95"
          aria-label={isOpen ? "Tutup Dera AI" : "Buka Dera AI"}
          title="Dera AI — Asisten Medis Virtual Klinik dr. Suhendra"
        >
          {/* Gelombang Aura / Radar Ping Glowing */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 opacity-75 blur-sm group-hover:opacity-100 animate-pulse transition duration-500" />
          <span className="absolute -inset-2.5 rounded-full border border-cyan-400/30 animate-ping pointer-events-none" />

          {/* Lingkaran Tombol dengan Gradient Navy & Aksen Medis */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-navy-950 via-navy-900 to-blue-950 border-2 border-cyan-400/80 shadow-2xl flex items-center justify-center overflow-hidden">
            
            {/* Animasi Cahaya Berputar Halus */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/10 to-transparent group-hover:via-cyan-400/25 transition-all duration-700 pointer-events-none" />

            {isOpen ? (
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
            ) : (
              <div className="flex flex-col items-center justify-center relative">
                {/* Robot/AI Avatar Icon dengan Efek Pulse */}
                <div className="relative">
                  <Bot className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-300 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.2} />
                  {/* Kilauan Sparkle AI */}
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 animate-spin-slow" />
                </div>
                <span className="text-[9px] font-black tracking-wider text-cyan-200 mt-0.5 uppercase drop-shadow">
                  DERA
                </span>
              </div>
            )}

            {/* Indikator Titik Hijau Status Online 24 Jam */}
            <div className="absolute bottom-1 right-2 sm:right-2.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-navy-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </div>
          </div>
        </button>
      </div>

      {/* ========================================================
          2. CHAT DRAWER / DIALOG INTERAKTIF DERA AI
         ======================================================== */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[410px] max-h-[82vh] h-[600px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300"
          role="dialog"
          aria-labelledby="dera-ai-title"
        >
          {/* HEADER CHAT */}
          <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-blue-950 text-white p-4 flex items-center justify-between border-b border-navy-800 shadow-sm relative">
            
            {/* Profil Dera AI */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-md flex items-center justify-center">
                  <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-cyan-300" strokeWidth={2.2} />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-navy-950 rounded-full" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 id="dera-ai-title" className="font-bold text-white text-base tracking-tight leading-none">
                    Dera AI
                  </h3>
                  <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border border-cyan-400/30">
                    Official
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Klinik dr. Suhendra • Siaga 24 Jam
                </p>
              </div>
            </div>

            {/* Tombol Kontrol Header */}
            <div className="flex items-center gap-1">
              
              {/* Toggle Suara Mute / Unmute */}
              <button
                onClick={() => {
                  if (!isMuted && playingMessageId) stopAudio();
                  setIsMuted(!isMuted);
                }}
                className={`p-2 rounded-xl transition-colors ${
                  isMuted 
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-navy-800' 
                    : 'text-cyan-300 hover:bg-navy-800 bg-navy-900/60'
                }`}
                title={isMuted ? "Nyalakan Suara Dera AI" : "Matikan Suara Dera AI"}
                aria-label="Toggle suara asisten"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Reset Percakapan */}
              <button
                onClick={handleResetChat}
                className="p-2 text-slate-400 hover:text-white hover:bg-navy-800 rounded-xl transition-colors"
                title="Hapus riwayat chat"
                aria-label="Reset percakapan"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Minimize / Close */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  stopAudio();
                }}
                className="p-2 text-slate-400 hover:text-white hover:bg-navy-800 rounded-xl transition-colors"
                title="Tutup jendela chat"
                aria-label="Tutup jendela"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* BANNER STATUS SUARA / SOUNDWAVE ACTIVE */}
          {playingMessageId && (
            <div className="bg-cyan-50 border-b border-cyan-200/80 px-3.5 py-1.5 flex items-center justify-between text-xs text-cyan-900">
              <div className="flex items-center gap-2">
                <span className="flex gap-0.5 items-end h-3.5">
                  <span className="w-1 bg-cyan-600 rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 bg-cyan-600 rounded-full animate-bounce h-3.5" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 bg-cyan-600 rounded-full animate-bounce h-2.5" style={{ animationDelay: '300ms' }} />
                </span>
                <span className="font-medium text-[11px]">Dera AI sedang berbicara (Garda Voice)...</span>
              </div>
              <button
                onClick={stopAudio}
                className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 bg-red-100 hover:bg-red-200 px-2 py-0.5 rounded-md transition"
              >
                <Square className="w-2.5 h-2.5 fill-current" />
                Stop
              </button>
            </div>
          )}

          {/* BADGE KEAMANAN CYBER */}
          <div className="bg-slate-50 border-b border-slate-100 px-3.5 py-1 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Private & Encrypted Server Proxy
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Model: Gemma 4 • TTS Ardi
            </span>
          </div>

          {/* DAFTAR PESAN (CHAT BODY) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            
            {messages.map((msg) => {
              const isAi = msg.role === 'assistant';
              const isPlaying = playingMessageId === msg.id;
              const isAudioLoading = audioLoadingId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Avatar AI */}
                  {isAi && (
                    <div className="w-7 h-7 rounded-xl bg-navy-950 flex items-center justify-center shrink-0 border border-blue-400/40 text-cyan-300 mt-1 shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  {/* Bubble Konten */}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm relative ${
                      isAi
                        ? 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-sm'
                        : 'bg-gradient-to-r from-navy-950 to-navy-900 text-white rounded-tr-sm shadow-navy'
                    }`}
                  >
                    <div className="prose prose-sm max-w-none text-left">
                      {renderFormattedText(msg.content)}
                    </div>

                    {/* Tombol Audio Speaker untuk Balasan AI */}
                    {isAi && (
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <button
                          onClick={() => handleToggleSpeak(msg.content, msg.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                            isPlaying
                              ? 'bg-red-50 text-red-600 border border-red-200'
                              : 'bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200'
                          }`}
                          title={isPlaying ? 'Hentikan audio' : 'Dengarkan suara Dera AI'}
                        >
                          {isAudioLoading ? (
                            <>
                              <span className="w-3 h-3 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                              <span>Memuat suara...</span>
                            </>
                          ) : isPlaying ? (
                            <>
                              <Square className="w-3 h-3 fill-current text-red-600" />
                              <span>Hentikan Suara</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                              <span>Dengarkan</span>
                            </>
                          )}
                        </button>

                        <span className="text-[10px] text-slate-400 font-mono">
                          {msg.timestamp}
                        </span>
                      </div>
                    )}

                    {!isAi && (
                      <div className="text-right mt-1">
                        <span className="text-[10px] text-slate-300 font-mono">
                          {msg.timestamp}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Indikator Mengetik / Memproses Jawaban AI */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-xl bg-navy-950 flex items-center justify-center shrink-0 border border-blue-400/40 text-cyan-300 mt-1">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Dera AI sedang memproses...</span>
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* REKOMENDASI PERTANYAAN CEPAT (CHIPS) */}
          <div className="p-2.5 bg-slate-100/80 border-t border-slate-200 overflow-x-auto">
            <div className="flex gap-1.5 whitespace-nowrap scrollbar-none">
              {QUICK_PROMPTS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.query)}
                  disabled={isLoading}
                  className="px-2.5 py-1 bg-white hover:bg-blue-50 hover:border-blue-300 text-slate-700 hover:text-blue-900 border border-slate-200 rounded-full text-[11px] font-medium transition shadow-2xs active:scale-95 disabled:opacity-50"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* INPUT FORM */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Tanyakan cabang, jadwal dokter, atau layanan..."
                disabled={isLoading}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition disabled:opacity-50 placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy-950 to-blue-600 hover:from-navy-900 hover:to-blue-500 text-white flex items-center justify-center shrink-0 transition shadow-md disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                aria-label="Kirim pesan"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Micro Links & Disclaimer Medis */}
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 pt-1">
              <span className="truncate max-w-[220px]">
                ⚠️ Info umum. Darurat segera ke IGD 24 Jam.
              </span>
              <a
                href="https://wa.me/6282311188250?text=Halo%20Klinik%20dr.%20Suhendra,%20saya%20butuh%20bantuan%20medis%20segera."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 font-bold hover:underline flex items-center gap-0.5"
              >
                <PhoneCall className="w-3 h-3" />
                Hotline WA
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
