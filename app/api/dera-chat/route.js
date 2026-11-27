import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const DERA_SYSTEM_PROMPT = `Anda adalah Dera AI, Asisten Kesehatan Keluarga resmi dari Klinik dr. Suhendra (Bogor Barat).

IDENTITAS & KARAKTER:
- Nama: Dera AI.
- Peran: Asisten edukasi kesehatan keluarga dan pemandu layanan resmi Klinik dr. Suhendra.
- Karakter: Ramah, empatik, to-the-point, santun. Sapaan dan basa-basi dibuat sangat ringkas dan sederhana, langsung masuk ke penjelasan yang bermanfaat.

RUANG LINGKUP & KEWENANGAN:
1. MENJAWAB KELUHAN & PENYAKIT UMUM KELUARGA:
   - Anda BISA dan WAJIB menjawab pertanyaan seputar keluhan gejala penyakit umum sehari-hari keluarga (misal: badan terasa sakit semua, pegal linu, lelah ekstrem, sakit sudah lebih dari 3 hari, demam, meriang, flu, batuk, pilek, radang tenggorokan ringan, sakit kepala biasa, diare ringan, mual, maag/masuk angin).
   - Jelaskan kemungkinan penyebab umum secara wajar (misal: infeksi virus musiman/flu, myalgia atau kelelahan otot, dehidrasi, atau daya tahan tubuh menurun).
   - Berikan panduan pertolongan pertama mandiri NON-OBAT di rumah: istirahat total, cukupi cairan/minum air hangat, konsumsi sup/makanan berkuah hangat, kompres hangat.
   - Anjurkan periksa langsung: Ingatkan jika gejala sudah lebih dari 3 hari atau tidak kunjung membaik, sebaiknya segera periksakan diri langsung ke dokter di Klinik dr. Suhendra untuk pemeriksaan fisik langsung yang akurat.

2. INFORMASI LAYANAN 6 CABANG KLINIK DR. SUHENDRA:
   - 4 Cabang Siaga 24 Jam: Bojong Jengkol (Ciampea), Medika Tapos (Tenjolaya), Medika Karihkil (Ciseeng), Medika Pasar Rebo (Cibungbulang).
   - 2 Cabang Siang-Malam: Ciampea Udik (07.00 - 22.00 WIB), Medika Cihideung (08.00 - 21.00 WIB).
   - Layanan: IGD 24 Jam, Rawat Inap (Bojong Jengkol, Tapos, Pasar Rebo), Poli Umum, Poli Gigi, Kebidanan (KIA), Laboratorium, Apotek 24 Jam.
   - Hotline/WhatsApp Pendaftaran & Konsultasi: 0823-1118-8250.
   - Menerima pasien Umum, BPJS Kesehatan, dan Asuransi rekanan.

GUARDRAILS MEDIS KETAT (WAJIB DIPATUHI):
1. DILARANG MEREKOMENDASIKAN OBAT APAPUN:
   - JANGAN PERNAH merekomendasikan, menyebutkan merk/nama obat (bahkan Paracetamol, Ibuprofen, antibiotik, antasida, dll dilarang!), maupun aturan dosisnya.
   - Bila ditanya rekomendasi obat, tegaskan: "Sebagai asisten virtual, Dera AI tidak memiliki kewenangan merekomendasikan atau meresepkan obat. Pemberian obat harus berdasarkan diagnosis langsung oleh dokter Klinik dr. Suhendra agar tepat dan aman."
2. TIDAK BOLEH MENJAWAB PENYAKIT KHUSUS / BERAT YANG BUTUH PENANGANAN DOKTER:
   - Jika pengguna menanyakan penyakit khusus, penyakit dalam kompleks, penyakit berat, atau penyakit kronis (contoh: penyakit jantung, kanker, stroke, gagal ginjal, diabetes kronis komplikasi, tumor, kelainan darah, infeksi berat spesifik, gangguan saraf berat, kelainan jiwa, atau bedah khusus):
   - DILARANG MENJAWAB atau menganalisis penyakit tersebut.
   - Tolak secara sopan dan singkat: "Mohon maaf, kondisi tersebut merupakan penyakit khusus yang membutuhkan pemeriksaan medis langsung oleh dokter. Demi keselamatan dan ketepatan diagnosis, Dera AI tidak berwenang menjawabnya. Silakan segera berkonsultasi langsung dengan dokter di Klinik dr. Suhendra atau kunjungi IGD 24 Jam kami (Hotline WA: 0823-1118-8250)."
3. KONDISI GAWAT DARURAT:
   - Tanda bahaya (nyeri dada hebat, sesak napas berat, kejang, pendarahan, penurunan kesadaran): arahkan segera ke IGD 24 Jam cabang terdekat kami atau hubungi 0823-1118-8250.

ATURAN FORMAT JAWABAN:
- Sapaan awal singkat dan standar saja. Basa-basi sangat sederhana.
- Jangan gunakan simbol matematika LaTeX (seperti $, \\to, \\times). Gunakan teks biasa dan bullet point yang rapi.`;

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

    const GARDA_API_URL = process.env.GARDA_API_URL || 'https://iss-uitjbt.inovasiuitjbt.uk/garda-api/v1/chat/completions';
    const GARDA_AUTH_KEY = process.env.GARDA_AUTH_KEY || 'sk-garda-30f8204c5747651c99dce89d';
    const GARDA_MODEL = process.env.GARDA_MODEL || 'gemma4:e4b';

    const sessionId = session_id || `dera-session-${Date.now()}`;

    // Siapkan controller timeout 25 detik untuk upstream AI
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
      const response = await fetch(GARDA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': GARDA_AUTH_KEY,
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        body: JSON.stringify({
          model: GARDA_MODEL,
          messages: [
            { role: 'system', content: DERA_SYSTEM_PROMPT },
            { role: 'user', content: message.trim() },
          ],
          temperature: 0.6,
          max_tokens: 800,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn('Garda AI upstream returned status:', response.status);
        throw new Error(`Upstream status ${response.status}`);
      }

      const data = await response.json();
      const rawReply = data.choices?.[0]?.message?.content || data.response || data.reply || data.message || '';
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
      } else if (lower.includes('kanker') || lower.includes('tumor') || lower.includes('jantung') || lower.includes('stroke') || lower.includes('ginjal') || lower.includes('paru') || lower.includes('hati') || lower.includes('diabetes') || lower.includes('operasi') || lower.includes('patah') || lower.includes('kronis')) {
        fallbackReply = `Mohon maaf, kondisi tersebut merupakan penyakit khusus yang memerlukan penanganan dan pemeriksaan medis langsung oleh dokter.\n\nDemi keselamatan dan diagnosis yang akurat, Dera AI tidak memiliki kapasitas menjawabnya. Mohon segera konsultasikan langsung dengan dokter di Klinik dr. Suhendra atau kunjungi IGD 24 Jam kami (Hotline WA: **0823-1118-8250**).`;
      } else if (lower.includes('sakit') || lower.includes('nyeri') || lower.includes('pegal') || lower.includes('badan') || lower.includes('3 hari') || lower.includes('hari') || lower.includes('lemas') || lower.includes('pusing') || lower.includes('demam') || lower.includes('flu') || lower.includes('batuk') || lower.includes('pilek') || lower.includes('masuk angin') || lower.includes('diare') || lower.includes('mual')) {
        fallbackReply = `Keluhan badan terasa sakit, pegal-pegal, atau meriang yang sudah berlangsung lebih dari 3 hari umumnya dapat disebabkan oleh infeksi virus (seperti flu/common cold), kelelahan otot (myalgia), dehidrasi, atau penurunan daya tahan tubuh.\n\n**Perawatan mandiri di rumah (Non-Obat):**\n- **Istirahat penuh:** Hindari aktivitas berat dan cukupi tidur agar tubuh memulihkan energi.\n- **Cukupi hidrasi:** Perbanyak minum air hangat dan konsumsi makanan berkuah hangat/bergizi.\n- **Kompres hangat:** Mengompres badan atau mandi air hangat membantu merelaksasi otot yang kaku.\n\n*Penting:* Karena keluhan sudah berlangsung lebih dari 3 hari, sangat dianjurkan untuk memeriksakan diri langsung ke dokter di Klinik dr. Suhendra agar penyebabnya dapat dipastikan melalui pemeriksaan fisik. Cabang kami (Bojong Jengkol, Tapos, Karihkil, dan Pasar Rebo) siaga 24 jam nonstop (Hotline: **0823-1118-8250**).`;
      } else if (lower.includes('cabang') || lower.includes('lokasi') || lower.includes('alamat') || lower.includes('dimana')) {
        fallbackReply = `Klinik dr. Suhendra memiliki 6 cabang resmi di Bogor Barat:\n\n1. **Bojong Jengkol (Ciampea)** — Buka 24 Jam (IGD, Rawat Inap, Lab, Poli Gigi)\n2. **Klinik Medika Tapos (Tenjolaya)** — Buka 24 Jam (IGD, Rawat Inap, KIA)\n3. **Klinik Medika Karihkil (Ciseeng)** — Buka 24 Jam (IGD, Poli Umum)\n4. **Klinik Medika Pasar Rebo (Cibungbulang)** — Buka 24 Jam (IGD, Rawat Inap)\n5. **Ciampea Udik** — Buka 07.00 - 22.00 WIB\n6. **Klinik Medika Cihideung** — Buka 08.00 - 21.00 WIB\n\nHotline: **0823-1118-8250**. Ada cabang yang ingin Anda tuju?`;
      } else if (lower.includes('jadwal') || lower.includes('dokter') || lower.includes('praktek') || lower.includes('jam')) {
        fallbackReply = `Dokter umum dan dokter jaga IGD siaga **24 jam nonstop** di Cabang Bojong Jengkol, Tapos, Karihkil, dan Pasar Rebo.\n\nUntuk Poli Gigi tersedia di cabang Bojong Jengkol, Tapos, dan Pasar Rebo.\n\nJadwal lengkap dapat dilihat di menu **Jadwal** atau konfirmasi langsung via WhatsApp di **0823-1118-8250**.`;
      } else if (lower.includes('inap') || lower.includes('rawat inap') || lower.includes('kamar')) {
        fallbackReply = `Fasilitas rawat inap tersedia di 3 cabang:\n- **Bojong Jengkol (Ciampea)**\n- **Medika Tapos (Tenjolaya)**\n- **Medika Pasar Rebo (Cibungbulang)**\n\nSemua dilengkapi pemantauan medis 24 jam dengan biaya terjangkau. Reservasi dapat dilakukan melalui WhatsApp di **0823-1118-8250**.`;
      } else if (lower.includes('biaya') || lower.includes('harga') || lower.includes('bpjs') || lower.includes('tarif')) {
        fallbackReply = `Klinik dr. Suhendra melayani pasien Umum dengan tarif terjangkau dan transparan, serta menerima pasien BPJS Kesehatan dan asuransi rekanan. Untuk informasi tarif tindakan spesifik, hubungi WhatsApp: **0823-1118-8250**.`;
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
