import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 30; // Izinkan durasi hingga 30 detik untuk pipeline fallback multi-provider di Vercel

const MIMO_API_KEY = process.env.MIMO_API_KEY || 'sk-sf1s0pfcuesaijz3618isgdy2cf7mninilzj9v9xt41fnsqx';
const MIMO_API_URL = process.env.MIMO_API_URL || 'https://api.xiaomimimo.com/v1';

/**
 * 1. PRIORITAS UTAMA: Garda AI TTS (Edge TTS Upstream)
 */
async function fetchGardaTTS(text, voice, speed) {
  const EDGE_TTS_URL = process.env.EDGE_TTS_URL || 'https://iss-uitjbt.inovasiuitjbt.uk/edge-tts/v1/audio/speech';
  const EDGE_TTS_API_KEY = process.env.EDGE_TTS_API_KEY || 'garda_secret_123';
  const targetVoice = voice || 'id-ID-GadisNeural';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2500); // 2.5 detik timeout untuk deteksi cepat

  try {
    const payload = {
      model: 'tts-1',
      input: text,
      voice: targetVoice,
      response_format: 'mp3',
      speed: Number(speed) || 1.0,
    };

    const res = await fetch(EDGE_TTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg, application/json',
        'Authorization': `Bearer ${EDGE_TTS_API_KEY}`,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[TTS 1 - Garda AI] HTTP Error: ${res.status}`);
      return null;
    }

    const rawBuf = await res.arrayBuffer();
    const firstBytes = new Uint8Array(rawBuf.slice(0, 4));
    const isJson = firstBytes[0] === 0x7B; // '{'
    if (isJson || rawBuf.byteLength < 500) {
      console.warn('[TTS 1 - Garda AI] Response payload bukan audio valid (kemungkinan JSON error)');
      return null;
    }

    return {
      buffer: Buffer.from(rawBuf),
      provider: `garda-ai-tts (${targetVoice})`,
    };
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('[TTS 1 - Garda AI] Gagal atau timeout:', err.message);
    return null;
  }
}

/**
 * 2. PRIORITAS KEDUA: Xiaomi MiMo TTS (Fallback jika Garda AI Error)
 * Mendeteksi error, timeout, atau habis kuota (401/402/429/insufficient_quota).
 */
async function fetchMimoTTS(text, requestedVoice) {
  const isMale = /dean|male|pria/i.test(requestedVoice || '');
  const isChloe = /chloe/i.test(requestedVoice || '');
  const voice = isMale ? 'Dean' : (isChloe ? 'Chloe' : 'Mia');

  const promptInstruction = isMale
    ? 'Bicara dalam Bahasa Indonesia yang ramah, tenang, berwibawa, dan jelas selayaknya dokter pria Klinik dr. Suhendra.'
    : 'Bicara dalam Bahasa Indonesia yang ramah, sopan, lembut, dan jelas selayaknya asisten medis wanita Dera Klinik dr. Suhendra.';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000); // 12 detik timeout untuk antisipasi server MiMo sedang antre

  try {
    const res = await fetch(`${MIMO_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MIMO_API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        model: 'mimo-v2.5-tts',
        messages: [
          { role: 'user', content: promptInstruction },
          { role: 'assistant', content: text }
        ],
        audio: {
          format: 'mp3',
          voice: voice
        }
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      console.warn(`[TTS 2 - Xiaomi MiMo] Error atau kuota habis (${res.status}):`, errText);
      return null;
    }

    const data = await res.json();

    // Deteksi jika respon mengandung error kuota
    if (data.error) {
      console.warn('[TTS 2 - Xiaomi MiMo] Terdeteksi pesan error dari MiMo:', data.error);
      return null;
    }

    const base64Audio = data.choices?.[0]?.message?.audio?.data;
    if (!base64Audio || base64Audio.length < 500) {
      console.warn('[TTS 2 - Xiaomi MiMo] Tidak ada payload audio yang valid');
      return null;
    }

    return {
      buffer: Buffer.from(base64Audio, 'base64'),
      provider: `mimo-v2.5-tts (${voice})`,
    };
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('[TTS 2 - Xiaomi MiMo] Gagal atau timeout:', err.message);
    return null;
  }
}

/**
 * 3. PRIORITAS KETIGA: Default TTS (Fallback jika Garda AI & MiMo Error / Kuota Habis)
 * Menggunakan mesin penutur asli Bahasa Indonesia (Google Native Indonesian Neural TTS).
 * 100% selalu siap, gratis tanpa kuota, dan suara wanita fasih berbahasa Indonesia.
 */
async function fetchDefaultIndonesianTTS(text) {
  try {
    const words = text.split(/\s+/);
    const chunks = [];
    let current = '';

    for (const w of words) {
      if ((current + ' ' + w).length > 160) {
        if (current.trim()) chunks.push(current.trim());
        current = w;
      } else {
        current += (current ? ' ' : '') + w;
      }
    }
    if (current.trim()) chunks.push(current.trim());

    if (chunks.length === 0) return null;

    const buffers = await Promise.all(
      chunks.map(async (chunk) => {
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=id&client=tw-ob&q=${encodeURIComponent(chunk)}`;
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const ab = await res.arrayBuffer();
        return Buffer.from(ab);
      })
    );

    const mergedBuffer = Buffer.concat(buffers);
    return {
      buffer: mergedBuffer,
      provider: 'default-indonesian-tts (wanita)',
    };
  } catch (err) {
    console.warn('[TTS 3 - Default TTS] Gagal sintesis default:', err.message);
    return null;
  }
}

export async function POST(req) {
  try {
    const { text, voice, speed } = await req.json();

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'Teks tidak boleh kosong', fallback: true }, { status: 400 });
    }

    // Bersihkan karakter LaTeX, rumus matematika, markdown, emoji, dan simbol
    const sanitizedText = String(text)
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/\$\s*\\rightarrow\s*\$|\\rightarrow|\$\s*\\to\s*\$|→/gi, ' ke ')
      .replace(/\$\s*\\Rightarrow\s*\$|\\Rightarrow|⇒/gi, ' menuju ')
      .replace(/\$\s*\\times\s*\$|\\times|×/gi, ' kali ')
      .replace(/\$([^\$\n]+)\$/g, '$1')
      .replace(/[\*\_~`#\-+]/g, ' ')
      .replace(/\\/g, ' ')
      .replace(/\r?\n|\r/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!sanitizedText) {
      return NextResponse.json({ error: 'Teks kosong setelah sanitasi', fallback: true }, { status: 400 });
    }

    // Batasi teks maksimal 350 karakter agar waktu respons cepat
    let speechInput = sanitizedText;
    if (speechInput.length > 350) {
      const trimmed = speechInput.slice(0, 350);
      const lastDot = Math.max(trimmed.lastIndexOf('. '), trimmed.lastIndexOf('? '), trimmed.lastIndexOf('! '));
      speechInput = lastDot > 150 ? trimmed.slice(0, lastDot + 1) : trimmed + '...';
    }

    const targetVoice = voice && voice !== 'id-ID-ArdiNeural' ? voice : 'id-ID-GadisNeural';

    let result = null;

    // =========================================================================
    // TAHAP 1 (UTAMA): Coba Garda AI TTS terlebih dahulu
    // =========================================================================
    result = await fetchGardaTTS(speechInput, targetVoice, speed);

    // =========================================================================
    // TAHAP 2 (KEDUA): Jika Garda AI Error / Down, gunakan Xiaomi MiMo TTS
    // =========================================================================
    if (!result) {
      console.log('[TTS Pipeline] Garda AI TTS tidak dapat dijangkau, mengalihkan ke Xiaomi MiMo TTS...');
      result = await fetchMimoTTS(speechInput, targetVoice);
    }

    // =========================================================================
    // TAHAP 3 (KETIGA): Jika MiMo Error atau Habis Kuota, gunakan Default TTS
    // =========================================================================
    if (!result) {
      console.log('[TTS Pipeline] Xiaomi MiMo TTS error / kuota habis, mengalihkan ke Default Indonesian TTS...');
      result = await fetchDefaultIndonesianTTS(speechInput);
    }

    // Kembalikan audio stream MP3 jika salah satu tahap berhasil
    if (result?.buffer) {
      return new NextResponse(result.buffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': result.buffer.length.toString(),
          'X-TTS-Provider': result.provider,
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
        },
      });
    }

    // =========================================================================
    // TAHAP 4 (FINAL): Jika seluruh server offline, fallback ke Browser Web Speech
    // =========================================================================
    console.warn('[TTS Pipeline] Seluruh penyedia server tidak tersedia, fallback ke browser Web Speech');
    return NextResponse.json({ error: 'TTS upstream tidak tersedia', fallback: true }, { status: 503 });

  } catch (err) {
    console.error('Dera TTS Route Error:', err);
    return NextResponse.json({ error: 'Gagal sintesis suara', fallback: true }, { status: 500 });
  }
}
