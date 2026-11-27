import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const MIMO_API_KEY = process.env.MIMO_API_KEY || 'sk-sf1s0pfcuesaijz3618isgdy2cf7mninilzj9v9xt41fnsqx';
const MIMO_API_URL = process.env.MIMO_API_URL || 'https://api.xiaomimimo.com/v1';
const DEFAULT_MIMO_VOICE = process.env.MIMO_VOICE || 'Mia';

/**
 * Helper untuk sintesis suara via Xiaomi MiMo TTS API (mimo-v2.5-tts)
 */
async function fetchMimoTTS(text, requestedVoice) {
  const isMale = /ardi|dean|male|pria/i.test(requestedVoice || '');
  const isChloe = /chloe/i.test(requestedVoice || '');
  
  // Pilih suara bawaan free tier Xiaomi MiMo:
  // - Mia: suara wanita anggun, hangat, dan ramah (paling direkomendasikan untuk asisten medis)
  // - Chloe: suara wanita ceria dan manis
  // - Dean: suara pria tenang dan berwibawa
  const voice = isMale ? 'Dean' : (isChloe ? 'Chloe' : (DEFAULT_MIMO_VOICE || 'Mia'));

  const promptInstruction = isMale
    ? 'Friendly, professional Indonesian male doctor voice, calm, reassuring, clear articulation, and warm tone.'
    : 'Warm, professional, gentle Indonesian female medical assistant voice, friendly, clear articulation, empathetic and natural pace.';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

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
      const errText = await res.text();
      console.warn(`[MiMo TTS] API error (${res.status}):`, errText);
      return null;
    }

    const data = await res.json();
    const base64Audio = data.choices?.[0]?.message?.audio?.data;
    if (!base64Audio) {
      console.warn('[MiMo TTS] No audio payload found in choice message');
      return null;
    }

    const audioBuffer = Buffer.from(base64Audio, 'base64');
    return {
      buffer: audioBuffer,
      voiceName: voice,
    };
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('[MiMo TTS] Fetch error or timeout:', err.message);
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

    // Bersihkan karakter LaTeX, markdown, emoji, dan simbol agar pembacaan TTS terdengar alami
    const sanitizedText = String(text)
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '') // Hapus emoji
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

    // Batasi teks maksimal 350 karakter agar sintesis suara responsif dan cepat
    let speechInput = sanitizedText;
    if (speechInput.length > 350) {
      const trimmed = speechInput.slice(0, 350);
      const lastDot = Math.max(trimmed.lastIndexOf('. '), trimmed.lastIndexOf('? '), trimmed.lastIndexOf('! '));
      speechInput = lastDot > 150 ? trimmed.slice(0, lastDot + 1) : trimmed + '...';
    }

    // 1. Coba panggil Garda Edge TTS terlebih dahulu
    let audioResultBuffer = null;
    let serviceProvider = 'garda-edge-tts';

    const edgeController = new AbortController();
    const edgeTimeout = setTimeout(() => edgeController.abort(), 4000); // Batasi timeout 4 detik agar cepat fallback jika upstream down

    try {
      const edgePayload = {
        model: 'tts-1',
        input: speechInput,
        voice: voice || 'id-ID-ArdiNeural',
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
        const isJson = firstBytes[0] === 0x7B; // '{'
        if (!isJson && rawBuf.byteLength > 500) {
          audioResultBuffer = Buffer.from(rawBuf);
        }
      }
    } catch (e) {
      clearTimeout(edgeTimeout);
      console.warn('[TTS] Garda Edge TTS unreachable:', e.message);
    }

    // 2. Jika Garda Edge TTS gagal/down, gunakan Xiaomi MiMo TTS
    if (!audioResultBuffer) {
      console.log('[TTS] Garda Edge TTS tidak aktif/error, mengalihkan ke Xiaomi MiMo TTS...');
      const mimoResult = await fetchMimoTTS(speechInput, voice);
      if (mimoResult?.buffer) {
        audioResultBuffer = mimoResult.buffer;
        serviceProvider = `mimo-v2.5-tts (${mimoResult.voiceName})`;
      }
    }

    // 3. Jika berhasil mendapatkan audio dari Garda maupun MiMo
    if (audioResultBuffer) {
      return new NextResponse(audioResultBuffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': audioResultBuffer.length.toString(),
          'X-TTS-Provider': serviceProvider,
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
        },
      });
    }

    // 4. Jika kedua provider tidak tersedia, fallback ke browser Web Speech API
    console.warn('[TTS] Seluruh upstream TTS gagal, mengembalikan fallback browser');
    return NextResponse.json({ error: 'Upstream TTS tidak tersedia', fallback: true }, { status: 503 });

  } catch (err) {
    console.error('Dera TTS Route Error:', err);
    return NextResponse.json({ error: 'Gagal sintesis suara', fallback: true }, { status: 500 });
  }
}
