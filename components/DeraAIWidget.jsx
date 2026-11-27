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

/**
 * Komponen Karakter Slime Dera AI
 * - Bulatan putih kebiruan (organic morphing slime)
 * - Layer gelombang 1 di belakang (biru doff transparan ~40%)
 * - Layer gelombang 2 di belakang (biru doff lebih transparan ~20%)
 * - Mata biru doff yang berkedip dan pupil mengikuti arah kursor mouse
 */
function DeraSlimeAvatar({ 
  eyeOffset = { x: 0, y: 0 }, 
  size = 'large', 
  isSpeaking = false,
  onClick
}) {
  const isLarge = size === 'large';

  return (
    <div 
      onClick={onClick}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${
        isLarge ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-10 h-10'
      }`}
      title="Dera AI — Asisten Kesehatan Keluarga Klinik dr. Suhendra"
    >
      {/* LAYER GELOMBANG 2 (Paling Belakang - Biru Doff Lebih Transparan ~20%) */}
      <div 
        className={`absolute rounded-full bg-[#1e3a8a]/20 pointer-events-none animate-wave-layer2 transition-all duration-500 ${
          isLarge ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-12 h-12'
        } ${isSpeaking ? 'scale-125 bg-blue-700/30' : ''}`}
      />

      {/* LAYER GELOMBANG 1 (Belakang Tengah - Biru Doff Agak Transparan ~40%) */}
      <div 
        className={`absolute rounded-full bg-[#1e40af]/40 pointer-events-none animate-wave-layer1 transition-all duration-500 ${
          isLarge ? 'w-18 h-18 sm:w-21 sm:h-21' : 'w-11 h-11'
        } ${isSpeaking ? 'scale-115 bg-blue-800/50' : ''}`}
      />

      {/* BULATAN PUTIH KEBIRUAN UTAMA (Slime Body Organik) */}
      <div 
        className={`relative rounded-full animate-slime-morph flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105 group-active:scale-95 ${
          isLarge ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-9 h-9'
        }`}
        style={{
          background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #f0f7ff 55%, #dbeafe 88%, #bfdbfe 100%)',
          boxShadow: isLarge 
            ? '0 10px 25px -4px rgba(30, 58, 138, 0.28), inset 0 2px 4px rgba(255, 255, 255, 0.95), inset 0 -3px 6px rgba(147, 197, 253, 0.55)'
            : '0 4px 12px -2px rgba(30, 58, 138, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 4px rgba(147, 197, 253, 0.45)',
          border: '1.5px solid rgba(191, 219, 254, 0.85)',
        }}
      >
        {/* Kilau Specular Highlight (Cahaya di Sudut Kiri Atas) */}
        <div 
          className={`absolute rounded-full bg-white/90 pointer-events-none ${
            isLarge ? 'top-2 left-2.5 w-3.5 h-2 rotate-[-30deg]' : 'top-1 left-1.5 w-2 h-1 rotate-[-30deg]'
          }`} 
        />

        {/* WAJAH DERA AI (Mata Biru Doff + Pupil Ikut Mouse + Senyum) */}
        <div className="flex flex-col items-center justify-center w-full z-10">
          
          {/* Baris Kedua Mata */}
          <div className={`flex items-center justify-center ${isLarge ? 'gap-2.5 sm:gap-3' : 'gap-1.5'}`}>
            
            {/* Mata Kiri (Biru Doff dengan animasi kedip) */}
            <div 
              className={`rounded-full bg-[#1e3a8a] overflow-hidden relative animate-slime-blink shadow-inner ${
                isLarge ? 'w-2.5 h-3.5 sm:w-3 sm:h-4' : 'w-1.5 h-2'
              }`}
            >
              {/* Pupil Bola Mata Biru Doff Tua Mengikuti Gerakan Mouse */}
              <div 
                className={`rounded-full bg-[#0f2744] absolute transition-transform duration-75 ease-out ${
                  isLarge ? 'w-1.5 h-2 sm:w-2 sm:h-2.5 top-0.5 left-0.5' : 'w-1 h-1 top-0.5 left-0.5'
                }`}
                style={{
                  transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                }}
              >
                {/* Kilauan Cahaya Putih di dalam Pupil */}
                <div 
                  className={`rounded-full bg-white absolute ${
                    isLarge ? 'w-1 h-1 top-0.5 left-0.5' : 'w-0.5 h-0.5 top-0 left-0'
                  }`} 
                />
              </div>
            </div>

            {/* Mata Kanan (Biru Doff dengan animasi kedip) */}
            <div 
              className={`rounded-full bg-[#1e3a8a] overflow-hidden relative animate-slime-blink shadow-inner ${
                isLarge ? 'w-2.5 h-3.5 sm:w-3 sm:h-4' : 'w-1.5 h-2'
              }`}
            >
              {/* Pupil Bola Mata Biru Doff Tua Mengikuti Gerakan Mouse */}
              <div 
                className={`rounded-full bg-[#0f2744] absolute transition-transform duration-75 ease-out ${
                  isLarge ? 'w-1.5 h-2 sm:w-2 sm:h-2.5 top-0.5 left-0.5' : 'w-1 h-1 top-0.5 left-0.5'
                }`}
                style={{
                  transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                }}
              >
                {/* Kilauan Cahaya Putih di dalam Pupil */}
                <div 
                  className={`rounded-full bg-white absolute ${
                    isLarge ? 'w-1 h-1 top-0.5 left-0.5' : 'w-0.5 h-0.5 top-0 left-0'
                  }`} 
                />
              </div>
            </div>

          </div>

          {/* Pipi Merona Lembut (Soft Blue Blush) */}
          <div className={`flex items-center justify-between w-full px-2.5 sm:px-3 -mt-0.5 pointer-events-none ${isLarge ? '' : 'hidden'}`}>
            <span className="w-1.5 h-1 rounded-full bg-blue-300/40" />
            <span className="w-1.5 h-1 rounded-full bg-blue-300/40" />
          </div>

          {/* Senyum Kecil Imut Biru Doff */}
          <div 
            className={`border-b-2 border-[#1e3a8a] rounded-b-full mx-auto ${
              isLarge ? 'w-2.5 sm:w-3 h-1 mt-0.5' : 'w-1.5 h-0.5 mt-0.5'
            } ${isSpeaking ? 'h-2 w-2 rounded-full border-2 border-[#1e3a8a] bg-[#1e3a8a]/20 animate-pulse' : ''}`}
          />
        </div>

        {/* Titik Hijau Status Siaga Online */}
        {isLarge && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>
        )}
      </div>
    </div>
  );
}

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
  const [showTooltip, setShowTooltip] = useState(true);
  const [sessionId, setSessionId] = useState('');
  
  // Koordinat pergerakan pupil mata mengikuti mouse
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  const widgetTriggerRef = useRef(null);
  const chatEndRef = useRef(null);
  const audioRef = useRef(null);
  const inputRef = useRef(null);

  // Inisialisasi session & tracker mouse
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

    // Auto-hide tooltip sambutan setelah 10 detik
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);

    // Event listener mousemove untuk pergerakan pupil mata
    const handleMouseMove = (e) => {
      if (!widgetTriggerRef.current) return;
      const rect = widgetTriggerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      const maxRadius = 3.2; // Batas radius gerak pupil
      if (distance === 0) {
        setEyeOffset({ x: 0, y: 0 });
        return;
      }

      // Hitung pergeseran proporsional yang halus
      const factor = Math.min(distance / 250, 1) * maxRadius;
      const angle = Math.atan2(deltaY, deltaX);

      setEyeOffset({
        x: Math.round(Math.cos(angle) * factor * 10) / 10,
        y: Math.round(Math.sin(angle) * factor * 10) / 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
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

  // Browser Speech Synthesis Fallback (id-ID voice)
  const playBrowserSpeech = (text, messageId) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setPlayingMessageId(null);
      setAudioLoadingId(null);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      // Bersihkan teks dari markdown & simbol
      const cleanText = text
        .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
        .replace(/[*_#`~-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.rate = 1.05;

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
      console.warn('Browser speech synthesis fallback error:', err);
      setPlayingMessageId(null);
      setAudioLoadingId(null);
    }
  };

  // Handle Play/Stop TTS
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

  // Render teks terformat rapi
  const renderFormattedText = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const parsedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.trim().startsWith('- ') || line.trim().startsWith('* ') || line.trim().startsWith('• ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-700 my-0.5 leading-relaxed">
            {parsedLine}
          </li>
        );
      }

      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
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
          1. FLOATING SLIME CHARACTER WIDGET (POJOK KANAN BAWAH)
         ======================================================== */}
      <div 
        ref={widgetTriggerRef}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      >
        
        {/* Tooltip Sambutan Sederhana & Ramah */}
        {!isOpen && showTooltip && (
          <div className="mb-2 mr-1 relative animate-bounce-subtle">
            <div className="bg-slate-900 text-white px-3.5 py-2.5 rounded-2xl shadow-xl border border-blue-400/30 text-xs sm:text-sm max-w-[230px] relative flex items-start gap-2">
              <span className="text-base leading-none">👋</span>
              <div>
                <p className="font-bold text-blue-200">Dera AI</p>
                <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
                  Asisten kesehatan keluarga. Tanya jadwal & info klinik!
                </p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-slate-400 hover:text-white p-0.5 transition"
                title="Tutup"
                aria-label="Tutup pesan"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              {/* Panah tooltip */}
              <div className="absolute -bottom-1.5 right-7 w-3 h-3 bg-slate-900 border-r border-b border-blue-400/30 transform rotate-45" />
            </div>
          </div>
        )}

        {/* Karakter Slime Interaktif Dera AI */}
        <DeraSlimeAvatar
          eyeOffset={eyeOffset}
          size="large"
          isSpeaking={!!playingMessageId}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
        />

        {/* Label Nama Kecil Doff di bawah Karakter */}
        <div 
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="mt-1 cursor-pointer select-none"
        >
          <span className="bg-[#1e3a8a]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm tracking-wide border border-blue-400/30 flex items-center gap-1 hover:bg-[#1e3a8a] transition">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            DERA AI
          </span>
        </div>
      </div>

      {/* ========================================================
          2. CHAT DRAWER / MODAL ASISTEN KESEHATAN KELUARGA
         ======================================================== */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[410px] max-h-[82vh] h-[600px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300"
          role="dialog"
          aria-labelledby="dera-ai-title"
        >
          {/* HEADER CHAT */}
          <div className="bg-gradient-to-r from-slate-900 via-[#1e3a8a] to-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-blue-900 shadow-sm relative">
            
            {/* Profil Slime Dera AI di Header */}
            <div className="flex items-center gap-2.5">
              <DeraSlimeAvatar
                eyeOffset={eyeOffset}
                size="small"
                isSpeaking={!!playingMessageId}
              />

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 id="dera-ai-title" className="font-bold text-white text-base tracking-tight leading-none">
                    Dera AI
                  </h3>
                  <span className="bg-blue-400/20 text-blue-200 text-[10px] font-medium px-1.5 py-0.5 rounded-full border border-blue-300/30">
                    Kesehatan Keluarga
                  </span>
                </div>
                <p className="text-[11px] text-slate-200 flex items-center gap-1 mt-0.5">
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
                <span className="font-medium text-[11px]">Dera AI sedang membaca suara...</span>
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
                  {/* Mini Slime Avatar untuk pesan AI */}
                  {isAi && (
                    <div className="mt-1 shrink-0">
                      <DeraSlimeAvatar eyeOffset={eyeOffset} size="small" />
                    </div>
                  )}

                  {/* Bubble Pesan */}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm relative ${
                      isAi
                        ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
                        : 'bg-gradient-to-r from-slate-900 to-[#1e3a8a] text-white rounded-tr-sm shadow-md'
                    }`}
                  >
                    <div className="prose prose-sm max-w-none text-left">
                      {renderFormattedText(msg.content)}
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
                        <span className="text-[10px] text-slate-300 font-mono">
                          {msg.timestamp}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Indikator AI Sedang Memproses */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="mt-1 shrink-0">
                  <DeraSlimeAvatar eyeOffset={eyeOffset} size="small" />
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
      )}
    </>
  );
}
