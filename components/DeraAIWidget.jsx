'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Volume2, 
  VolumeX, 
  Square, 
  X, 
  RotateCcw, 
  PhoneCall, 
  ChevronDown, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Activity,
  HeartPulse
} from 'lucide-react';

const QUICK_PROMPTS = [
  { label: '🏥 6 Cabang & Lokasi', query: 'Di mana saja lokasi 6 cabang Klinik dr. Suhendra dan jam bukanya?' },
  { label: '👨‍⚕️ Jadwal Dokter & Poli', query: 'Bagaimana jadwal dokter umum dan poli gigi hari ini?' },
  { label: '🩺 Info Penyakit Umum', query: 'Apa saja langkah penanganan awal untuk demam dan flu di rumah?' },
  { label: '🚑 IGD & Rawat Inap', query: 'Cabang mana saja yang menyediakan IGD 24 Jam dan rawat inap?' },
];

export default function DeraAIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: 'Halo, saya **Dera AI**, asisten kesehatan keluarga dari **Klinik dr. Suhendra**.\n\nSaya siap membantu memberikan informasi seputar layanan 6 cabang klinik kami serta edukasi kesehatan keluarga untuk keluhan penyakit umum.\n\nAda yang bisa Dera bantu hari ini?',
      timestamp: 'Baru saja'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState(null);
  const [audioLoadingId, setAudioLoadingId] = useState(null);
  const [sessionId, setSessionId] = useState('');

  const chatEndRef = useRef(null);
  const audioRef = useRef(null);
  const inputRef = useRef(null);

  // Inisialisasi session & event listener custom event dari Navbar
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

    // Listener ketika tombol Dera AI di Navbar diklik
    const handleToggle = () => {
      setIsOpen(prev => !prev);
    };

    const handleOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('toggle-dera-ai', handleToggle);
    window.addEventListener('open-dera-ai', handleOpen);

    return () => {
      window.removeEventListener('toggle-dera-ai', handleToggle);
      window.removeEventListener('open-dera-ai', handleOpen);
    };
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

  // Hentikan audio jika unmount
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

  // Browser Speech Synthesis Fallback (Suara Laki-laki Bahasa Indonesia)
  const playBrowserSpeech = (text, messageId) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setPlayingMessageId(null);
      setAudioLoadingId(null);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      // Bersihkan teks dari markdown, asterik, dan simbol
      const cleanText = text
        .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
        .replace(/[*_#`~-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.rate = 1.0;
      utterance.pitch = 0.84; // Suara pria hangat & tenang

      const voices = window.speechSynthesis.getVoices();
      const idVoices = voices.filter(v => v.lang.includes('id') || v.lang.includes('ID') || v.lang.includes('ind'));
      const maleIdVoice = idVoices.find(v => {
        const name = (v.name || '').toLowerCase();
        return name.includes('ardi') || name.includes('male') || name.includes('laki') || name.includes('pria') || name.includes('andika') || name.includes('budi') || name.includes('tri');
      }) || idVoices[0];

      if (maleIdVoice) {
        utterance.voice = maleIdVoice;
      }

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
      console.warn('Browser speech synthesis fallback error:', err);
      setPlayingMessageId(null);
      setAudioLoadingId(null);
    }
  };

  // Handle Play/Stop TTS dengan suara laki-laki Garda AI (id-ID-ArdiNeural)
  const handleToggleSpeak = async (text, messageId) => {
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
          voice: 'id-ID-ArdiNeural', // Suara resmi Garda AI laki-laki
          speed: 1.0,
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
        playBrowserSpeech(text, messageId);
      }
    } catch (err) {
      console.warn('TTS proxy error, fallback to browser speech:', err);
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
      const replyText = data.reply || 'Maaf, Dera AI sedang mengalami kendala sesaat. Anda dapat langsung berkonsultasi via WhatsApp di 0823-1118-8250.';
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
          content: 'Koneksi terputus sesaat. Untuk informasi segera, silakan hubungi WhatsApp kami di **0823-1118-8250**.',
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
        content: 'Halo, percakapan telah direset. Silakan tanyakan seputar layanan 6 cabang Klinik dr. Suhendra atau info kesehatan umum keluarga Anda.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Render teks terformat rapi (dengan teks terang untuk bubble pesan user)
  const renderFormattedText = (text, isAi = true) => {
    if (!text) return null;

    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const parsedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong 
              key={pIdx} 
              className={isAi ? "font-semibold text-slate-900" : "font-semibold text-white"}
            >
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (line.trim().startsWith('- ') || line.trim().startsWith('* ') || line.trim().startsWith('• ')) {
        return (
          <li 
            key={idx} 
            className={`ml-4 list-disc my-0.5 leading-relaxed ${isAi ? 'text-slate-700' : 'text-white'}`}
          >
            {parsedLine}
          </li>
        );
      }

      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }

      return (
        <p 
          key={idx} 
          className={`my-1 leading-relaxed ${isAi ? 'text-slate-700' : 'text-white font-normal'}`}
        >
          {parsedLine}
        </p>
      );
    });
  };

  if (!isOpen) {
    return null; // Dera AI trigger berada di sebelah kanan menu "Kegiatan" di Header Navbar
  }

  return (
    <>
      {/* ========================================================
          CHAT DRAWER / MODAL ASISTEN KESEHATAN KELUARGA
         ======================================================== */}
      <div 
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[85vh] h-[620px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300"
        role="dialog"
        aria-labelledby="dera-ai-title"
      >
        {/* HEADER CHAT */}
        <div className="bg-gradient-to-r from-slate-900 via-[#1e3a8a] to-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-blue-900 shadow-sm relative">
          
          {/* Header Branding Dera AI */}
          <div className="flex items-center gap-2.5">
            <div>
              <div className="flex items-center gap-2">
                <h3 id="dera-ai-title" className="font-bold text-white text-base tracking-tight leading-none">
                  Dera AI
                </h3>
                <span className="bg-blue-400/20 text-blue-200 text-[10px] font-medium px-2 py-0.5 rounded-full border border-blue-300/30">
                  Kesehatan Keluarga
                </span>
              </div>
              <p className="text-[11px] text-slate-200 flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Klinik dr. Suhendra • 6 Cabang
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
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' 
                  : 'text-blue-300 hover:bg-slate-800 bg-slate-800/60'
              }`}
              title={isMuted ? "Nyalakan Suara" : "Matikan Suara"}
              aria-label="Toggle suara asisten"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Reset Percakapan */}
            <button
              onClick={handleResetChat}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
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
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              title="Tutup chat"
              aria-label="Tutup jendela"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BANNER STATUS SUARA / SOUNDWAVE ACTIVE */}
        {playingMessageId && (
          <div className="bg-blue-50 border-b border-blue-200 px-3.5 py-1.5 flex items-center justify-between text-xs text-blue-900">
            <div className="flex items-center gap-2">
              <span className="flex gap-0.5 items-end h-3.5">
                <span className="w-1 bg-[#1e3a8a] rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                <span className="w-1 bg-[#1e3a8a] rounded-full animate-bounce h-3.5" style={{ animationDelay: '150ms' }} />
                <span className="w-1 bg-[#1e3a8a] rounded-full animate-bounce h-2.5" style={{ animationDelay: '300ms' }} />
              </span>
              <span className="font-medium text-[11px]">Dera AI sedang berbicara (Suara Laki-laki Garda AI)...</span>
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

        {/* DAFTAR PESAN (CHAT BODY) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
          
          {messages.map((msg) => {
            const isAi = msg.role === 'assistant';
            const isPlaying = playingMessageId === msg.id;
            const isAudioLoading = audioLoadingId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                {/* Bubble Pesan */}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm relative ${
                    isAi
                      ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
                      : 'bg-gradient-to-r from-blue-700 to-[#1e3a8a] text-white rounded-tr-sm shadow-md'
                  }`}
                >
                  <div className={`text-left ${isAi ? 'prose prose-sm max-w-none text-slate-700' : 'text-white font-medium leading-relaxed'}`}>
                    {renderFormattedText(msg.content, isAi)}
                  </div>

                  {/* Tombol Audio Speaker untuk Balasan AI */}
                  {isAi && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <button
                        onClick={() => handleToggleSpeak(msg.content, msg.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                          isPlaying
                            ? 'bg-red-50 text-red-600 border border-red-200'
                            : 'bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-slate-200'
                        }`}
                        title={isPlaying ? 'Hentikan suara' : 'Dengarkan suara'}
                      >
                        {isAudioLoading ? (
                          <>
                            <span className="w-3 h-3 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                            <span>Memuat...</span>
                          </>
                        ) : isPlaying ? (
                          <>
                            <Square className="w-3 h-3 fill-current text-red-600" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-blue-700" />
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
                      <span className="text-[10px] text-blue-100 font-mono">
                        {msg.timestamp}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Indikator Sedang Berfikir */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm flex items-center gap-2">
                <span className="text-xs text-slate-600 font-medium">Sedang berfikir...</span>
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

        {/* QUICK PROMPT CHIPS */}
        <div className="p-2.5 bg-slate-100/90 border-t border-slate-200 overflow-x-auto">
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
              placeholder="Tanya seputar layanan 6 cabang atau info kesehatan umum..."
              disabled={isLoading}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition disabled:opacity-50 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-[#1e3a8a] hover:from-slate-800 hover:to-blue-700 text-white flex items-center justify-center shrink-0 transition shadow-md disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              aria-label="Kirim pertanyaan"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Micro Guardrails & Hotline IGD */}
          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 pt-1">
            <span className="truncate max-w-[230px]">
              ⚠️ Asisten umum. Tidak meresepkan obat / diagnosa berat.
            </span>
            <a
              href="https://wa.me/6282311188250?text=Halo%20Klinik%20dr.%20Suhendra,%20saya%20butuh%20informasi%20medis."
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
    </>
  );
}
