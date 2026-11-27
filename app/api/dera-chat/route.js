import { NextResponse } from 'next/server';

const GARDA_API_URL = process.env.GARDA_API_URL;
const GARDA_AUTH_KEY = process.env.GARDA_AUTH_KEY;
const GARDA_MODEL = process.env.GARDA_MODEL || 'gemma4:e4b';

const DERA_SYSTEM_PROMPT = `Anda adalah Dera AI, Asisten Medis Virtual & Konsultan Layanan Pasien Cerdas resmi Klinik dr. Suhendra.
Nama Anda "Dera AI", diambil dari nama Klinik dr. Suhendra.

TENTANG KLINIK DR. SUHENDRA:
Klinik dr. Suhendra adalah jaringan fasilitas pelayanan kesehatan primer dan rawat inap terpercaya dengan pengalaman lebih dari 10 tahun, melayani lebih dari 500.000 pasien di wilayah Bogor Barat, Jawa Barat.

JARINGAN 6 CABANG RESMI:
1. Klinik dr. Suhendra Bojong Jengkol (Pusat & Rawat Inap Utama):
   - Alamat: Jl. Raya Bojong Jengkol No. 45, Ciampea, Bogor
   - Jam: Siaga 24 Jam Nonstop setiap hari
   - Fasilitas: IGD 24 Jam, Rawat Inap, Laboratorium, Apotek, Poli Umum, Poli Gigi
   - Hotline IGD / WA: 0823-1118-8250
2. Klinik Medika Tapos:
   - Alamat: Jl. Raya Tapos No. 12, Tenjolaya, Bogor
   - Jam: Siaga 24 Jam Nonstop
   - Fasilitas: Rawat Inap, IGD 24 Jam, Poli Umum, Poli Gigi, KIA
3. Klinik Medika Karihkil:
   - Alamat: Jl. Raya Karihkil No. 88, Ciseeng, Bogor
   - Jam: Siaga 24 Jam Nonstop
   - Fasilitas: IGD 24 Jam, Poli Umum
4. Klinik dr. Suhendra Ciampea Udik:
   - Alamat: Jl. Ciampea Udik KM 3, Ciampea, Bogor
   - Jam: 07.00 - 22.00 WIB
   - Fasilitas: Poli Umum, KIA / Kebidanan
5. Klinik Medika Cihideung:
   - Alamat: Jl. Raya Cihideung Ilir No. 27, Ciampea, Bogor
   - Jam: 08.00 - 21.00 WIB
   - Fasilitas: Poli Umum Rawat Jalan
6. Klinik Medika Pasar Rebo:
   - Alamat: Jl. Pasar Rebo Cibungbulang No. 05, Bogor
   - Jam: Siaga 24 Jam Nonstop
   - Fasilitas: IGD 24 Jam, Rawat Inap, Poli Umum, Poli Gigi

LAYANAN UTAMA KAMI:
- Poli Umum & Rawat Jalan
- Instalasi Gawat Darurat (IGD) 24 Jam
- Rawat Inap Nyaman & Higienis
- Kebidanan, Ibu & Anak (KIA) & USG Kehamilan
- Laboratorium Diagnostik Terpadu
- Apotek & Farmasi 24 Jam Berstandar BPOM
- Poli Gigi & Perawatan Mulut

METODE PEMBAYARAN:
Menerima pasien Umum (biaya terjangkau & transparan), BPJS Kesehatan, dan mitra asuransi swasta.

TUGAS ANDA SEBAGAI DERA AI:
1. Sambut pasien dengan hangat, ramah, dan empati tinggi khas pelayanan kesehatan.
2. Jawab pertanyaan seputar lokasi cabang terdekat, jam operasional, jadwal dokter, pendaftaran antrean, dan fasilitas yang tersedia.
3. Berikan informasi edukasi kesehatan ringan yang menenangkan bila pasien menceritakan gejala/keluhan umum.
4. SELALU sertakan disclaimer medis: jika pasien mengalami keluhan darurat (sesak napas berat, kejang, nyeri dada mendadak, pendarahan, atau trauma), arahkan segera ke ruang IGD 24 jam cabang terdekat (Bojong Jengkol, Tapos, Karihkil, atau Pasar Rebo) atau hubungi 0823-1118-8250.
5. Bila pasien ingin mendaftar atau konsultasi lebih lanjut, tawarkan bantuan untuk menghubungkan langsung ke WhatsApp pendaftaran klinik (0823-1118-8250).

ATURAN FORMAT JAWABAN (PENTING):
- Jawab secara to-the-point, jelas, rapi, dan mudah dibaca (gunakan bullet points jika menyebutkan cabang/layanan).
- DILARANG menggunakan notasi LaTeX atau simbol matematika seperti $\\to$, $\\times$, \\rightarrow. Gunakan tanda panah biasa "→" atau kata sambung.
- Gunakan bahasa Indonesia yang baik, santun, dan menenangkan hati pasien.`;

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

      if (lower.includes('cabang') || lower.includes('lokasi') || lower.includes('alamat') || lower.includes('dimana')) {
        fallbackReply = `Klinik dr. Suhendra memiliki 6 cabang aktif di wilayah Bogor Barat:\n\n1. **Cabang Utama Bojong Jengkol (Ciampea)** — Buka 24 Jam Nonstop (IGD & Rawat Inap)\n2. **Klinik Medika Tapos (Tenjolaya)** — Buka 24 Jam Nonstop (IGD & Rawat Inap)\n3. **Klinik Medika Karihkil (Ciseeng)** — Buka 24 Jam Nonstop\n4. **Klinik Medika Pasar Rebo (Cibungbulang)** — Buka 24 Jam Nonstop\n5. **Klinik dr. Suhendra Ciampea Udik** — Buka 07.00 - 22.00 WIB\n6. **Klinik Medika Cihideung** — Buka 08.00 - 21.00 WIB\n\nUntuk bantuan darurat silakan hubungi hotline kami di **0823-1118-8250**. Ada cabang tertentu yang ingin Anda kunjungi? 😊`;
      } else if (lower.includes('jadwal') || lower.includes('dokter') || lower.includes('praktek') || lower.includes('jam')) {
        fallbackReply = `Dokter jaga IGD dan dokter umum siaga **24 jam nonstop** di Cabang Bojong Jengkol, Tapos, Karihkil, dan Pasar Rebo.\n\nUntuk Poli Gigi tersedia di cabang Bojong Jengkol (Selasa & Kamis 14.00-20.00 WIB), Tapos, dan Pasar Rebo.\n\nAnda dapat melihat jadwal dokter lengkap di menu **Jadwal** atau langsung reservasi via WhatsApp di **0823-1118-8250**. Ada dokter atau poli spesifik yang ingin Anda tanyakan? 🩺`;
      } else if (lower.includes('inap') || lower.includes('rawat inap') || lower.includes('kamar')) {
        fallbackReply = `Fasilitas **Rawat Inap** Klinik dr. Suhendra tersedia di:\n- **Cabang Utama Bojong Jengkol (Ciampea)**\n- **Klinik Medika Tapos (Tenjolaya)**\n- **Klinik Medika Pasar Rebo (Cibungbulang)**\n\nDilengkapi ruang perawatan yang higienis, tenang, visit dokter berkala, pemantauan tanda vital 24 jam, serta biaya yang ramah keluarga. Silakan hubungi 0823-1118-8250 untuk reservasi kamar. 🛏️`;
      } else if (lower.includes('biaya') || lower.includes('harga') || lower.includes('bpjs') || lower.includes('tarif')) {
        fallbackReply = `Klinik dr. Suhendra berkomitmen pada biaya medis yang **jelas, terjangkau, dan transparan** bagi seluruh lapisan masyarakat. Kami melayani pasien umum, BPJS Kesehatan, dan mitra asuransi kesehatan.\n\nUntuk rincian biaya tindakan medis atau pemeriksaan lab tertentu, tim kami siap memberikan penjelasan detail via WhatsApp di **0823-1118-8250**. 📋`;
      } else if (lower.includes('darurat') || lower.includes('igd') || lower.includes('sesak') || lower.includes('demam') || lower.includes('sakit')) {
        fallbackReply = `Halo, jika Anda atau keluarga sedang mengalami kondisi darurat (demam tinggi berlanjut, sesak, trauma, atau keluhan akut), segera kunjungi **ruang IGD 24 Jam** terdekat kami di Bojong Jengkol, Tapos, Karihkil, atau Pasar Rebo.\n\nHotline siaga darurat kami: **0823-1118-8250** (siap 24 jam). Kesehatan dan keselamatan Anda adalah prioritas utama kami. 🏥`;
      } else {
        fallbackReply = `Halo! Saya **Dera AI**, asisten medis cerdas Klinik dr. Suhendra.\n\nSaya siap membantu Anda dengan informasi seputar:\n- 🏥 Lokasi & rute 6 cabang aktif di Bogor Barat\n- 🕒 Jam buka layanan & IGD 24 jam nonstop\n- 👨‍⚕️ Jadwal praktik dokter umum & dokter gigi\n- 🛏️ Fasilitas rawat inap, kebidanan KIA, lab, & apotek\n- 📋 Pendaftaran nomor antrean via WhatsApp\n\nAda yang bisa Dera bantu untuk kesehatan Anda hari ini? 😊`;
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
