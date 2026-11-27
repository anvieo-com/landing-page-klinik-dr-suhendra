import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const MIMO_API_KEY = process.env.MIMO_API_KEY || 'sk-sf1s0pfcuesaijz3618isgdy2cf7mninilzj9v9xt41fnsqx';
const MIMO_API_URL = process.env.MIMO_API_URL || 'https://api.xiaomimimo.com/v1';

/**
 * Helper untuk sintesis suara penutur asli Bahasa Indonesia (Google Native Indonesian TTS)
 * Menghasilkan suara wanita asli Bahasa Indonesia yang fasih, jernih, dan berintonasi alami.
 */
async function fetchGoogleIndonesianTTS(text) {
  try {
    // Pecah teks menjadi segmen maksimal 160 karakter agar pengucapan lancar
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
        if (!res.ok) throw new Error(`Google TTS status ${res.status}`);
        const ab = await res.arrayBuffer();
        return Buffer.from(ab);
      })
    );

    return Buffer.concat(buffers);
  } catch (err) {
    console.warn('[Google Indonesian TTS] Error:', err.message);
    return null;
  }
}

/**
 * Helper untuk sintesis suara via Xiaomi MiMo TTS API (mimo-v2.5-tts)
 */
async function fetchMimoTTS(text, requestedVoice) {
  const isMale = /dean|male|pria/i.test(requestedVoice || '');
  const isChloe = /chloe/i.test(requestedVoice || '');
  const voice = isMale ? 'Dean' : (isChloe ? 'Chloe' : 'Mia');

  const promptInstruction = isMale
    ? 'Indonesian speaking male doctor voice, clear and reassuring.'
    : 'Indonesian speaking female healthcare assistant voice, friendly, polite and clear.';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

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

    if (!res.ok) return null;

    const data = await res.json();
    const base64Audio = data.choices?.[0]?.message?.audio?.data;
    if (!base64Audio) return null;

    return Buffer.from(base64Audio, 'base64');
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('[MiMo TTS] Error:', err.message);
    return null;
  }
}

export async function POST(req) {
  try {
    const { text, voice, speed } = await req.json();

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'Teks tidak boleh kosong', fallback: true }, { status: 400 });
    }

    const EDGE_TTS_URL = process.env.EDGE_TTS_URL || 'https://iss-uitjbt.inovasiuitjbt.uk/edge-tts/v1/audio/speech';
    const EDGE_TTS_API_KEY = process.env.EDGE_TTS_API_KEY || 'garda_secret_123';

    // Bersihkan karakter LaTeX, rumus, markdown, emoji, dan simbol agar pelafalan bahasa Indonesia terdengar alami
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

    // Batasi teks maksimal 350 karakter agar sintesis responsif
    let speechInput = sanitizedText;
    if (speechInput.length > 350) {
      const trimmed = speechInput.slice(0, 350);
      const lastDot = Math.max(trimmed.lastIndexOf('. '), trimmed.lastIndexOf('? '), trimmed.lastIndexOf('! '));
      speechInput = lastDot > 150 ? trimmed.slice(0, lastDot + 1) : trimmed + '...';
    }

    // Default suara wanita Indonesia Dera AI: id-ID-GadisNeural
    const targetVoice = voice && voice !== 'id-ID-ArdiNeural' ? voice : 'id-ID-GadisNeural';

    let audioBuffer = null;
    let providerName = '';

    // 1. Prioritas 1: Garda Edge TTS (id-ID-GadisNeural)
    try {
      const edgeController = new AbortController();
      const edgeTimeout = setTimeout(() => edgeController.abort(), 3500);

      const edgePayload = {
        model: 'tts-1',
        input: speechInput,
        voice: targetVoice,
        response_format: 'mp3',
        speed: Number(speed) || 1.0,
      };

      const edgeResponse = await fetch(EDGE_TTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg, application/json',
          'Authorization': `Bearer ${EDGE_TTS_API_KEY}`,
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        body: JSON.stringify(edgePayload),
        signal: edgeController.signal,
      });

      clearTimeout(edgeTimeout);

      if (edgeResponse.ok) {
        const rawBuf = await edgeResponse.arrayBuffer();
        const firstBytes = new Uint8Array(rawBuf.slice(0, 4));
        const isJson = firstBytes[0] === 0x7B;
        if (!isJson && rawBuf.byteLength > 500) {
          audioBuffer = Buffer.from(rawBuf);
          providerName = `garda-edge-tts (${targetVoice})`;
        }
      }
    } catch (e) {
      console.warn('[TTS] Garda Edge TTS unavailable:', e.message);
    }

    // 2. Prioritas 2 (Utama Fallback): Google Native Indonesian Neural TTS (Suara Wanita Indonesia Asli)
    if (!audioBuffer) {
      console.log('[TTS] Menggunakan Google Native Indonesian TTS (Suara Wanita Asli)...');
      const googleAudio = await fetchGoogleIndonesianTTS(speechInput);
      if (googleAudio && googleAudio.length > 500) {
        audioBuffer = googleAudio;
        providerName = 'google-indonesian-tts (wanita)';
      }
    }

    // 3. Prioritas 3: Xiaomi MiMo TTS (mimo-v2.5-tts)
    if (!audioBuffer) {
      console.log('[TTS] Mengalihkan ke Xiaomi MiMo TTS...');
      const mimoAudio = await fetchMimoTTS(speechInput, targetVoice);
      if (mimoAudio && mimoAudio.length > 500) {
        audioBuffer = mimoAudio;
        providerName = 'mimo-v2.5-tts';
      }
    }

    // Kembalikan audio jika berhasil
    if (audioBuffer) {
      return new NextResponse(audioBuffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': audioBuffer.length.toString(),
          'X-TTS-Provider': providerName,
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
        },
      });
    }

    // 4. Jika seluruh provider server-side gagal, fallback ke Web Speech API browser
    console.warn('[TTS] Seluruh server TTS tidak tersedia, mengembalikan fallback browser');
    return NextResponse.json({ error: 'TTS upstream tidak tersedia', fallback: true }, { status: 503 });

  } catch (err) {
    console.error('Dera TTS Route Error:', err);
    return NextResponse.json({ error: 'Gagal sintesis suara', fallback: true }, { status: 500 });
  }
}
