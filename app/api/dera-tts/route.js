import { NextResponse } from 'next/server';

const EDGE_TTS_URL = process.env.EDGE_TTS_URL;
const EDGE_TTS_API_KEY = process.env.EDGE_TTS_API_KEY;

export async function POST(req) {
  try {
    const { text, voice, speed } = await req.json();

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'Teks tidak boleh kosong', fallback: true }, { status: 400 });
    }

    // Bersihkan karakter LaTeX, markdown, emoji, dan simbol agar TTS membaca lancar dan alami
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

    // Potong teks maksimal ~350 karakter agar sintesis suara cepat dan tidak berat
    let speechInput = sanitizedText;
    if (speechInput.length > 350) {
      const trimmed = speechInput.slice(0, 350);
      const lastDot = Math.max(trimmed.lastIndexOf('. '), trimmed.lastIndexOf('? '), trimmed.lastIndexOf('! '));
      speechInput = lastDot > 150 ? trimmed.slice(0, lastDot + 1) : trimmed + '...';
    }

    const payload = {
      model: 'tts-1',
      input: speechInput,
      voice: voice || 'id-ID-ArdiNeural', // Suara Garda AI: Ramah, formal & alami bahasa Indonesia
      response_format: 'mp3',
      speed: Number(speed) || 1.05,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(EDGE_TTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg, application/json',
          'Authorization': `Bearer ${EDGE_TTS_API_KEY}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn('Garda Edge TTS API returned non-ok:', response.status);
        return NextResponse.json({ error: `Edge TTS Status ${response.status}`, fallback: true }, { status: 503 });
      }

      const audioBuffer = await response.arrayBuffer();

      // Pastikan response adalah audio valid (bukan JSON error message dari server upstream)
      const firstBytes = new Uint8Array(audioBuffer.slice(0, 4));
      const isJson = firstBytes[0] === 0x7B; // '{' in ASCII
      if (isJson) {
        console.warn('Garda Edge TTS returned JSON payload instead of audio, falling back to client voice');
        return NextResponse.json({ error: 'Upstream returned json error', fallback: true }, { status: 503 });
      }

      return new NextResponse(audioBuffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': audioBuffer.byteLength.toString(),
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
        },
      });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      console.warn('Garda Edge TTS unreachable/timeout, fallback to browser speech synthesis:', fetchErr.message);
      return NextResponse.json({ error: 'Edge TTS service timeout or unreachable', fallback: true }, { status: 503 });
    }
  } catch (err) {
    console.error('Dera TTS Route Error:', err);
    return NextResponse.json({ error: 'Gagal sintesis suara', fallback: true }, { status: 500 });
  }
}
