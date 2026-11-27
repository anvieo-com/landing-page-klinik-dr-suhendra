import { NextResponse } from 'next/server';

const GARDA_API_URL = process.env.GARDA_API_URL;
const GARDA_AUTH_KEY = process.env.GARDA_AUTH_KEY;
const GARDA_MODEL = process.env.GARDA_MODEL || 'gemma4:e4b';

const DERA_SYSTEM_PROMPT = `Anda adalah Dera AI, Asisten Kesehatan Keluarga resmi Klinik dr. Suhendra.

IDENTITAS & KARAKTER:
- Nama: Dera AI (Asisten Kesehatan Keluarga).
- Gaya komunikasi: Ramah, santun, to-the-point, dan tidak bertele-tele. Basa-basi dibuat sangat sederhana saja.

RUANG LINGKUP TUGAS (HANYA BOLEH MENJAWAB 2 HAL INI):
1. Informasi Layanan Klinik dr. Suhendra:
   - Jaringan 6 cabang resmi di Bogor Barat (lokasi, jam operasional, rute).
   - Layanan medis: IGD 24 Jam, Rawat Inap, Poli Umum, Poli Gigi, Kebidanan & KIA, Laboratorium, Apotek 24 Jam.
   - Jadwal praktik dokter, antrean, dan pendaftaran WhatsApp (0823-1118-8250).
   - Menerima pasien Umum, BPJS Kesehatan, dan Asuransi.
2. Edukasi Penyakit Umum Keluarga:
   - Hanya penyakit umum ringan sehari-hari: demam biasa, batuk, pilek, flu, diare ringan, maag/asam lambung ringan, sakit kepala ringan, alergi debu/makanan ringan, luka lecet ringan, serta tips menjaga daya tahan tubuh keluarga (hidrasi, nutrisi, istirahat).

BATASAN KETAT (GUARDRAILS MEDIS - WAJIB DIPATUHI):
1. DILARANG MEREKOMENDASIKAN OBAT APAPUN:
   - Jangan pernah menyebutkan nama obat (kimia, generik, merk dagang, sirup, tablet, maupun antibiotik) serta dosisnya.
   - Jika pengguna meminta rekomendasi obat, tegaskan secara sopan: "Sebagai asisten virtual, Dera AI tidak memiliki wewenang merekomendasikan obat. Silakan periksakan diri langsung ke dokter Klinik dr. Suhendra untuk mendapatkan diagnosis dan resep obat yang tepat serta aman."
   - Berikan hanya pertolongan pertama non-obat (banyak minum air hangat, kompres air biasa/hangat, istirahat cukup).
2. DILARANG MENJAWAB PENYAKIT DI LUAR PENYAKIT UMUM:
   - Jika ditanya mengenai penyakit kronis kompleks, penyakit berat, kelainan jantung, kanker, gangguan saraf rumit, penyakit dalam berat, atau kondisi di luar kapasitas penyakit umum, tolak secara sopan dan singkat: "Mohon maaf, kondisi tersebut berada di luar kapasitas Dera AI sebagai asisten kesehatan keluarga. Demi keselamatan dan penanganan yang akurat, mohon segera konsultasikan langsung dengan dokter di Klinik dr. Suhendra atau hubungi IGD 24 Jam kami di 0823-1118-8250."
3. KELUHAN GAWAT DARURAT:
   - Jika ada tanda bahaya (sesak napas berat, kejang, nyeri dada mendadak, pendarahan, penurunan kesadaran), langsung arahkan ke IGD 24 Jam cabang terdekat kami (Bojong Jengkol, Tapos, Karihkil, atau Pasar Rebo) atau hubungi hotline 0823-1118-8250.

DATA 6 CABANG KLINIK DR. SUHENDRA:
1. Cabang Utama Bojong Jengkol (Ciampea): Siaga 24 Jam Nonstop (IGD 24 Jam, Rawat Inap, Lab, Apotek, Poli Umum, Poli Gigi). Hotline/WA: 0823-1118-8250.
2. Klinik Medika Tapos (Tenjolaya): Siaga 24 Jam Nonstop (IGD 24 Jam, Rawat Inap, Poli Umum, Poli Gigi, KIA).
3. Klinik Medika Karihkil (Ciseeng): Siaga 24 Jam Nonstop (IGD 24 Jam, Poli Umum).
4. Klinik Medika Pasar Rebo (Cibungbulang): Siaga 24 Jam Nonstop (IGD 24 Jam, Rawat Inap, Poli Umum, Poli Gigi).
5. Klinik dr. Suhendra Ciampea Udik: Buka 07.00 - 22.00 WIB (Poli Umum, KIA).
6. Klinik Medika Cihideung: Buka 08.00 - 21.00 WIB (Poli Umum).

ATURAN FORMAT JAWABAN:
- Sapaan awal singkat dan standar saja. Basa-basi sangat sederhana.
- Langsung masuk ke inti jawaban.
- DILARANG menggunakan notasi LaTeX atau simbol matematika seperti $\\to$, $\\times$, \\rightarrow.
- Gunakan bahasa Indonesia yang baik dan mudah dipahami.`;

// Fungsi pembersih karakter matematika LaTeX / simbol aneh
function cleanSymbols(text) {
  if (!text) return '';
  return text
    .replace(/\$\s*\\rightarrow\s*\$|\\rightarrow|\$\s*\\to\s*\$|→/gi, ' → ')
    .replace(/\$\s*\\times\s*\$|\\times|×/gi, ' x ')
    .replace(/\$([^\$\n]+)\$/g, '$1')
    .replace(/\\/g, '')
    .trim();
}

export async function POST(req) {
  try {
    const { message, session_id } = await req.json();

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Pesan tidak boleh kosong' },
        { status: 400 }
      );
    }

    const sessionId = session_id || `dera-session-${Date.now()}`;

    // Siapkan controller timeout 15 detik untuk upstream AI
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(GARDA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': GARDA_AUTH_KEY,
        },
        body: JSON.stringify({
          session_id: sessionId,
          model: GARDA_MODEL,
          message: message.trim(),
          system_prompt: DERA_SYSTEM_PROMPT,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn('Garda AI upstream returned status:', response.status);
        throw new Error(`Upstream status ${response.status}`);
      }

      const data = await response.json();
      const rawReply = data.response || data.reply || data.message || '';
      const cleanedReply = cleanSymbols(rawReply);

      return NextResponse.json({
        success: true,
        reply: cleanedReply,
        session_id: data.session_id || sessionId,
      });
    } catch (upstreamErr) {
      clearTimeout(timeoutId);
      console.warn('Garda AI upstream error/timeout, using resilient local intelligence fallback:', upstreamErr.message);

      // Resilient local medical intelligence fallback jika koneksi upstream terganggu
      const lower = message.toLowerCase();
      let fallbackReply = '';

      if (lower.includes('obat') || lower.includes('resep') || lower.includes('minum obat') || lower.includes('dosis') || lower.includes('paracetamol') || lower.includes('antibiotik')) {
        fallbackReply = `Sebagai asisten kesehatan keluarga, Dera AI tidak memiliki wewenang merekomendasikan atau meresepkan obat apapun.\n\nUntuk mendapatkan penanganan dan resep obat yang tepat serta aman sesuai kondisi Anda, silakan periksakan diri langsung ke dokter di cabang Klinik dr. Suhendra terdekat atau konsultasi melalui WhatsApp: **0823-1118-8250**.`;
      } else if (lower.includes('kanker') || lower.includes('tumor') || lower.includes('jantung') || lower.includes('stroke') || lower.includes('ginjal') || lower.includes('operasi') || lower.includes('parah')) {
        fallbackReply = `Mohon maaf, kondisi tersebut berada di luar kapasitas Dera AI sebagai asisten kesehatan keluarga.\n\nDemi keselamatan dan diagnosis yang akurat, mohon segera konsultasikan langsung dengan dokter di Klinik dr. Suhendra atau kunjungi ruang IGD 24 Jam kami (Hotline: **0823-1118-8250**).`;
      } else if (lower.includes('cabang') || lower.includes('lokasi') || lower.includes('alamat') || lower.includes('dimana')) {
        fallbackReply = `Klinik dr. Suhendra memiliki 6 cabang resmi di Bogor Barat:\n\n1. **Bojong Jengkol (Ciampea)** — Buka 24 Jam (IGD, Rawat Inap, Lab, Poli Gigi)\n2. **Klinik Medika Tapos (Tenjolaya)** — Buka 24 Jam (IGD, Rawat Inap, KIA)\n3. **Klinik Medika Karihkil (Ciseeng)** — Buka 24 Jam (IGD, Poli Umum)\n4. **Klinik Medika Pasar Rebo (Cibungbulang)** — Buka 24 Jam (IGD, Rawat Inap)\n5. **Ciampea Udik** — Buka 07.00 - 22.00 WIB\n6. **Klinik Medika Cihideung** — Buka 08.00 - 21.00 WIB\n\nHotline: **0823-1118-8250**. Ada cabang yang ingin Anda tuju?`;
      } else if (lower.includes('jadwal') || lower.includes('dokter') || lower.includes('praktek') || lower.includes('jam')) {
        fallbackReply = `Dokter umum dan dokter jaga IGD siaga **24 jam nonstop** di Cabang Bojong Jengkol, Tapos, Karihkil, dan Pasar Rebo.\n\nUntuk Poli Gigi tersedia di cabang Bojong Jengkol, Tapos, dan Pasar Rebo.\n\nJadwal lengkap dapat dilihat di menu **Jadwal** atau konfirmasi langsung via WhatsApp di **0823-1118-8250**.`;
      } else if (lower.includes('inap') || lower.includes('rawat inap') || lower.includes('kamar')) {
        fallbackReply = `Fasilitas rawat inap tersedia di 3 cabang:\n- **Bojong Jengkol (Ciampea)**\n- **Medika Tapos (Tenjolaya)**\n- **Medika Pasar Rebo (Cibungbulang)**\n\nSemua dilengkapi pemantauan medis 24 jam dengan biaya terjangkau. Reservasi dapat dilakukan melalui WhatsApp di **0823-1118-8250**.`;
      } else if (lower.includes('biaya') || lower.includes('harga') || lower.includes('bpjs') || lower.includes('tarif')) {
        fallbackReply = `Klinik dr. Suhendra melayani pasien Umum dengan tarif terjangkau dan transparan, serta menerima pasien BPJS Kesehatan dan asuransi rekanan. Untuk informasi tarif tindakan spesifik, hubungi WhatsApp: **0823-1118-8250**.`;
      } else if (lower.includes('demam') || lower.includes('flu') || lower.includes('batuk') || lower.includes('pilek') || lower.includes('masuk angin') || lower.includes('diare')) {
        fallbackReply = `Untuk keluhan umum tersebut, langkah awal keluarga yang dianjurkan:\n- Perbanyak istirahat dan tidur yang cukup\n- Minum banyak air putih hangat dan konsumsi makanan berkuah\n- Kompres hangat jika demam\n\nJika gejala berlanjut lebih dari 2 hari atau bertambah berat, segera periksakan ke dokter Klinik dr. Suhendra untuk pemeriksaan fisik langsung.`;
      } else if (lower.includes('darurat') || lower.includes('sesak') || lower.includes('kejang') || lower.includes('darah')) {
        fallbackReply = `Jika ada tanda bahaya darurat, segera bawa pasien ke **IGD 24 Jam** cabang terdekat (Bojong Jengkol, Tapos, Karihkil, atau Pasar Rebo) atau hubungi hotline: **0823-1118-8250**.`;
      } else {
        fallbackReply = `Halo, saya Dera AI, asisten kesehatan keluarga Klinik dr. Suhendra. Ada yang bisa saya bantu seputar layanan 6 cabang klinik atau informasi kesehatan umum keluarga?`;
      }

      return NextResponse.json({
        success: true,
        reply: fallbackReply,
        session_id: sessionId,
      });
    }
  } catch (error) {
    console.error('Dera Chat API Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kendala pada asisten Dera AI. Silakan coba kembali sesaat lagi.' },
      { status: 500 }
    );
  }
}
