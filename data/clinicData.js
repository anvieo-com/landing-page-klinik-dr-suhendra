export const clinicInfo = {
  name: "Klinik dr. Suhendra",
  tagline: "Pelayanan Terbaik untuk Kesehatan Anda dan Keluarga",
  shortDesc: "Pusat pelayanan kesehatan keluarga terpercaya dengan komitmen pelayanan ramah, terjangkau, dan berkualitas selama 24 jam nonstop di Bogor dan sekitarnya.",
  emergencyPhone: "0823-1118-8250",
  formattedPhone: "(0823) 1118-8250",
  email: "Hai@klinikdrsuhendra.id",
  whatsapp: "6282311188250",
  operationalHours: "Buka 24 Jam Setiap Hari (Termasuk Hari Libur)",
  mainBranch: "Bojong Jengkol, Bogor",
  totalPatients: "50k+",
  totalDoctors: "20+",
  totalBranches: "6",
  satisfactionRate: "99%",
  yearsExperience: "10+ Tahun",
};

export const branches = [
  {
    id: "bojong-jengkol",
    name: "Klinik dr. Suhendra Bojong Jengkol",
    shortName: "Bojong Jengkol (Pusat)",
    address: "Jl. Raya Bojong Jengkol No. 45, Ciampea, Bogor, Jawa Barat",
    phone: "0823-1118-8250",
    hours: "24 Jam Nonstop",
    is24Hours: true,
    hasRanap: true,
    hasUGD: true,
    hasLab: true,
    hasGigi: true,
    lat: -6.5713042,
    lng: 106.7077089,
    image: "/assets/gambar1.jpg",
    desc: "Cabang utama & pusat rujukan Klinik dr. Suhendra dengan fasilitas rawat inap terpadu, instalasi gawat darurat (IGD) 24 jam nonstop, laboratorium diagnostik terstandar, dan apotek BPOM lengkap.",
    mapsUrl: "https://maps.google.com/?q=Klinik+dr+Suhendra+Bojong+Jengkol",
    doctors: [
      { name: "dr. Raudhatul Ulfha", poli: "Poli Umum", schedule: "18.00 - 08.00 WIB", days: "Senin - Sabtu" },
      { name: "dr. Rina Mauliza", poli: "Poli Umum", schedule: "08.00 - 18.00 WIB", days: "Senin - Jumat" },
      { name: "dr. Eri", poli: "Poli Umum & Gawat Darurat", schedule: "24 Jam Bergilir", days: "Setiap Hari" },
      { name: "dr. Tan Wily Ramadhani", poli: "Poli Umum", schedule: "18.00 - 08.00 WIB", days: "Rabu - Minggu" },
      { name: "dr. Safira Nurullita Irsa", poli: "Poli Umum", schedule: "08.00 - 16.00 WIB", days: "Senin - Kamis" },
      { name: "drg. Anindya Larasati", poli: "Poli Gigi", schedule: "14.00 - 20.00 WIB", days: "Selasa & Kamis" }
    ]
  },
  {
    id: "tapos",
    name: "Klinik Medika Tapos",
    shortName: "Medika Tapos",
    address: "Jl. Raya Tapos No. 12, Tenjolaya, Bogor, Jawa Barat",
    phone: "0823-1118-8251",
    hours: "24 Jam Nonstop",
    is24Hours: true,
    hasRanap: true,
    hasUGD: true,
    hasLab: true,
    hasGigi: true,
    lat: -6.628050580035894,
    lng: 106.6930319813659,
    image: "/assets/gambar2.jpg",
    desc: "Melayani masyarakat Tenjolaya dan Tapos dengan ruang tindakan darurat 24 jam nonstop, ruang rawat inap tenang dan asri, pemeriksaan USG ibu & anak, serta poli gigi profesional.",
    mapsUrl: "https://maps.google.com/?q=Klinik+Medika+Tapos",
    doctors: [
      { name: "dr. Ahmad Fauzi", poli: "Poli Umum", schedule: "08.00 - 20.00 WIB", days: "Senin - Jumat" },
      { name: "dr. Siti Aminah", poli: "Poli Umum", schedule: "20.00 - 08.00 WIB", days: "Setiap Hari" },
      { name: "drg. Budi Santoso", poli: "Poli Gigi & Mulut", schedule: "16.00 - 21.00 WIB", days: "Senin, Rabu, Jumat" }
    ]
  },
  {
    id: "karihkil",
    name: "Klinik Medika Karihkil",
    shortName: "Medika Karihkil",
    address: "Jl. Raya Karihkil No. 88, Ciseeng, Bogor, Jawa Barat",
    phone: "0823-1118-8252",
    hours: "24 Jam Nonstop",
    is24Hours: true,
    hasRanap: false,
    hasUGD: true,
    hasLab: true,
    hasGigi: false,
    lat: -6.493772863488733,
    lng: 106.67993977508462,
    image: "/assets/gambar3.jpg",
    desc: "Pusat pelayanan kesehatan primer strategis di Ciseeng dengan IGD siaga 24 jam, uji laboratorium darah cepat, dan konsultasi kesehatan keluarga menyeluruh.",
    mapsUrl: "https://maps.google.com/?q=Klinik+Medika+Karihkil",
    doctors: [
      { name: "dr. Hendra Wijaya", poli: "Poli Umum & Darurat", schedule: "24 Jam Bergilir", days: "Setiap Hari" },
      { name: "dr. Maya Sari", poli: "Poli Umum", schedule: "08.00 - 20.00 WIB", days: "Senin - Sabtu" }
    ]
  },
  {
    id: "ciampea",
    name: "Klinik dr. Suhendra Ciampea Udik",
    shortName: "Ciampea Udik",
    address: "Jl. Ciampea Udik KM 3, Ciampea, Bogor, Jawa Barat",
    phone: "0823-1118-8253",
    hours: "07.00 - 22.00 WIB",
    is24Hours: false,
    hasRanap: false,
    hasUGD: true,
    hasLab: true,
    hasGigi: true,
    lat: -6.614411300000001,
    lng: 106.64710997431645,
    image: "/assets/gambar1.jpg",
    desc: "Fasilitas kesehatan di jalur utama Ciampea Udik dengan layanan dokter umum berpengalaman, tindakan gawat darurat, poli gigi, dan konsultasi kesehatan anak.",
    mapsUrl: "https://maps.google.com/?q=Klinik+Suhendra+Ciampea+Udik",
    doctors: [
      { name: "dr. Rizky Pratama", poli: "Poli Umum", schedule: "14.00 - 22.00 WIB", days: "Senin - Sabtu" },
      { name: "dr. Indah Permata", poli: "Poli Umum & KIA", schedule: "07.00 - 14.00 WIB", days: "Senin - Jumat" }
    ]
  },
  {
    id: "cihideung",
    name: "Klinik Medika Cihideung",
    shortName: "Medika Cihideung",
    address: "Jl. Raya Cihideung Ilir No. 27, Ciampea, Bogor, Jawa Barat",
    phone: "0823-1118-8254",
    hours: "08.00 - 21.00 WIB",
    is24Hours: false,
    hasRanap: false,
    hasUGD: false,
    hasLab: true,
    hasGigi: false,
    lat: -6.569190064217741,
    lng: 106.71989727508567,
    image: "/assets/gambar2.jpg",
    desc: "Layanan pengobatan umum rawat jalan dan apotek terstandar di Cihideung Ilir, melayani konsultasi penyakit akut maupun kronis dengan resep obat rasional.",
    mapsUrl: "https://maps.google.com/?q=Klinik+Medika+Cihideung",
    doctors: [
      { name: "dr. Faisal Anwar", poli: "Poli Umum", schedule: "13.00 - 21.00 WIB", days: "Senin - Jumat" },
      { name: "dr. Rani Septiani", poli: "Poli Umum", schedule: "08.00 - 13.00 WIB", days: "Senin - Sabtu" }
    ]
  },
  {
    id: "pasar-rebo",
    name: "Klinik Medika Ps. Rebo",
    shortName: "Medika Pasar Rebo",
    address: "Jl. Pasar Rebo Cibungbulang No. 05, Bogor, Jawa Barat",
    phone: "0823-1118-8255",
    hours: "24 Jam Nonstop",
    is24Hours: true,
    hasRanap: true,
    hasUGD: true,
    hasLab: true,
    hasGigi: true,
    lat: -6.583778464359847,
    lng: 106.71608157508591,
    image: "/assets/gambar4.png",
    desc: "Fasilitas terpadu di Cibungbulang dengan IGD & Rawat Inap 24 jam nonstop, poli gigi keluarga, laboratorium darah, dan ambulans siaga rujukan.",
    mapsUrl: "https://maps.google.com/?q=Klinik+Medika+Pasar+Rebo+Bogor",
    doctors: [
      { name: "dr. Yusuf Mansur", poli: "Poli Umum", schedule: "24 Jam Bergilir", days: "Setiap Hari" },
      { name: "dr. Dewi Sartika", poli: "Poli Umum", schedule: "08.00 - 20.00 WIB", days: "Senin - Sabtu" },
      { name: "drg. Kevin Halim", poli: "Poli Gigi", schedule: "17.00 - 21.00 WIB", days: "Selasa, Kamis, Sabtu" }
    ]
  }
];

export const valuePillars = [
  {
    id: "patient-first",
    icon: "Users",
    title: "Pasien Adalah Prioritas",
    description: "Kenyamanan, privasi, dan kesembuhan pasien merupakan fokus utama dari setiap tindakan medis kami."
  },
  {
    id: "advanced-care",
    icon: "HeartPulse",
    title: "Penanganan Modern & Akurat",
    description: "Didukung perangkat medis berstandar, laboratorium terpadu, dan prosedur diagnostik yang presisi."
  },
  {
    id: "expert-team",
    icon: "ShieldCheck",
    title: "Tim Medis Berpengalaman",
    description: "Dokter umum, dokter gigi, perawat, dan apoteker tersertifikasi siap mendampingi proses pemulihan Anda."
  },
  {
    id: "trusted-care",
    icon: "Award",
    title: "Etis, Transparan & Terpercaya",
    description: "Pilihan obat rasional, estimasi biaya yang transparan, serta rekam medis terpadu yang aman."
  }
];

export const services = [
  {
    id: "poli-umum",
    title: "Poli Umum & Rawat Jalan",
    badge: "Layanan Pokok",
    icon: "Stethoscope",
    image: "/assets/gambar1.jpg",
    summary: "Konsultasi komprehensif, diagnosis penyakit umum, pemeriksaan fisik rutin, dan perawatan berkala seluruh keluarga.",
    description: "Poli Umum Klinik dr. Suhendra melayani keluhan kesehatan umum dewasa dan lansia. Tim dokter kami mengedepankan pendekatan preventif, kuratif, dan edukatif dengan diagnosis yang teliti.",
    features: [
      "Pemeriksaan Tanda Vital Lengkap (Tensi, Nadi, Saturasi O2)",
      "Konsultasi Gejala & Keluhan Akut Maupun Kronis",
      "Pemberian Terapi & Resep Obat Rasional",
      "Surat Keterangan Sehat & Pemeriksaan Pra-Kerja",
      "Rujukan Cepat ke Rumah Sakit Mitra bila Diperlukan"
    ],
    schedule: "Setiap Hari (24 Jam di Cabang Utama)"
  },
  {
    id: "igd-24-jam",
    title: "IGD & Gawat Darurat 24 Jam",
    badge: "Siaga 24/7",
    icon: "Ambulance",
    image: "/assets/gambar4.png",
    summary: "Pelayanan gawat darurat sigap dan tepat sasaran untuk penanganan trauma, luka, sesak, dan kondisi kritis mendesak.",
    description: "Instalasi Gawat Darurat beroperasi 24 jam nonstop dengan tim perawat & dokter jaga terlatih BLS/ACLS. Dilengkapi peralatan resusitasi, nebulizer, dan obat darurat lengkap.",
    features: [
      "Penanganan Cepat Resusitasi & Stabilisasi Pasien",
      "Penjahitan Luka (Hecting) & Perawatan Trauma Ringan",
      "Terapi Nebulisasi Asma & Sesak Napas",
      "Pemasangan Infus, Kateter, dan Oksigen Medis",
      "Layanan Ambulans Siaga untuk Rujukan Cepat"
    ],
    schedule: "Buka 24 Jam Nonstop Setiap Hari"
  },
  {
    id: "rawat-inap",
    title: "Rawat Inap Nyaman & Higienis",
    badge: "Fasilitas Unggulan",
    icon: "Bed",
    image: "/assets/gambar3.jpg",
    summary: "Kamar rawat inap dengan ventilasi asri, tempat tidur medis modern, dan pemantauan perawat intensif 24 jam.",
    description: "Fasilitas rawat inap kami didesain nyaman dan hening agar proses pemulihan pasien berlangsung optimal. Kami menyediakan kelas VIP dan Standar dengan asuhan keperawatan yang penuh empati.",
    features: [
      "Kamar Ber-AC / Ventilasi Bersih dan Bersahabat",
      "Pemantauan Dokter Visit Setiap Hari",
      "Pengawasan Keperawatan 24 Jam dengan Nurse Call",
      "Menu Gizi Seimbang Sesuai Anjuran Dokter",
      "Lingkungan Tenang Mendukung Kesembuhan Pasien"
    ],
    schedule: "Pelayanan Rawat Inap 24 Jam"
  },
  {
    id: "laboratorium",
    title: "Laboratorium & Cek Darah",
    badge: "Diagnostik Cepat",
    icon: "Microscope",
    image: "/assets/gambar2.jpg",
    summary: "Pemeriksaan darah lengkap, gula darah, kolesterol, asam urat, fungsi ginjal, tes urin, dan rapid test akurat.",
    description: "Laboratorium diagnostik kami menggunakan reagen bermutu dan alat semi-otomatis berstandar untuk memberikan hasil uji yang cepat, akurat, dan dapat diandalkan oleh dokter Anda.",
    features: [
      "Hematologi Lengkap (Darah Rutin, Hemoglobin, Leukosit, Trombosit)",
      "Pemeriksaan Kimia Darah (GDS, Kolesterol, Asam Urat, Trigliserida)",
      "Pemeriksaan Fungsi Hati & Ginjal (SGOT, SGPT, Ureum, Kreatinin)",
      "Urinalisis & Tes Kehamilan Akurat",
      "Hasil Cepat dalam Hitungan Menit untuk Tes Tertentu"
    ],
    schedule: "Senin - Sabtu: 07.00 - 21.00 WIB (IGD Lab 24 Jam)"
  },
  {
    id: "kia-usg",
    title: "Kesehatan Ibu, Anak & USG",
    badge: "Penuh Kasih",
    icon: "Baby",
    image: "/assets/gambar1.jpg",
    summary: "Pemeriksaan kehamilan rutin, USG 2D/4D, imunisasi anak lengkap, pemantauan tumbuh kembang, dan program KB.",
    description: "Layanan ramah ibu dan anak yang mengawal fase awal kehamilan hingga masa pertumbuhan si kecil. Ditangani bidan dan dokter berpengalaman dengan pendekatan lembut dan bersahabat.",
    features: [
      "Pemeriksaan Kehamilan Antenatal Care (ANC)",
      "Pemeriksaan USG Kandungan",
      "Imunisasi Dasar Lengkap Bayi & Balita",
      "Konsultasi KB (Suntik, IUD, Implan, Pil KB)",
      "Konseling Laktasi dan Manajemen Gizi Anak"
    ],
    schedule: "Senin - Sabtu: 08.00 - 20.00 WIB"
  },
  {
    id: "farmasi",
    title: "Farmasi & Apotek 24 Jam",
    badge: "Obat Berkualitas",
    icon: "Pill",
    image: "/assets/gambar3.jpg",
    summary: "Penyediaan obat resep dan non-resep terdaftar BPOM dengan harga terjangkau, edukasi etiket, dan konsultasi apoteker.",
    description: "Instalasi Farmasi Klinik dr. Suhendra menjamin ketersediaan obat generik dan paten resmi berkhasiat. Apoteker kami selalu siap menjelaskan aturan minum dan kemungkinan efek samping.",
    features: [
      "Penyediaan Obat Resep Dokter Lengkap & Berkualitas",
      "Obat Bebas (OTC) & Multivitamin Daya Tahan Tubuh",
      "Penyimpanan Sesuai Standar Suhu Dingin (Cold Chain Vaccine)",
      "Konsultasi Aturan Pakai dan Interaksi Obat Gratis",
      "Layanan Tebus Resep Cepat & Ramah"
    ],
    schedule: "Buka 24 Jam Setiap Hari"
  }
];

export const featuredDoctors = [
  {
    name: "dr. Raudhatul Ulfha",
    title: "Dokter Umum & Penanggung Jawab Klinis",
    experience: "8+ Tahun Pengalaman",
    rating: "4.9",
    reviewsCount: 340,
    specialty: "Poli Umum & Darurat",
    branch: "Bojong Jengkol",
    photo: "/assets/dokter.png",
    quote: "Melayani dengan ketulusan hati demi senyuman dan kesembuhan setiap pasien."
  },
  {
    name: "dr. Ahmad Fauzi",
    title: "Dokter Umum Senior",
    experience: "10+ Tahun Pengalaman",
    rating: "4.9",
    reviewsCount: 285,
    specialty: "Poli Umum & Penyakit Menahun",
    branch: "Medika Tapos",
    photo: "/assets/dokter.png",
    quote: "Kesehatan yang baik dimulai dari pencegahan dan diagnosis yang seksama."
  },
  {
    name: "dr. Indah Permata",
    title: "Dokter Kesehatan Ibu & Anak",
    experience: "7+ Tahun Pengalaman",
    rating: "4.9",
    reviewsCount: 312,
    specialty: "KIA & Tumbuh Kembang",
    branch: "Ciampea Udik",
    photo: "/assets/dokter.png",
    quote: "Mendampingi tumbuh kembang buah hati dengan kasih sayang dan standar medis terbaik."
  },
  {
    name: "drg. Budi Santoso",
    title: "Dokter Gigi & Mulut",
    experience: "9+ Tahun Pengalaman",
    rating: "4.8",
    reviewsCount: 198,
    specialty: "Poli Gigi & Konservasi",
    branch: "Medika Tapos",
    photo: "/assets/dokter.png",
    quote: "Senyum sehat dan percaya diri adalah hak setiap keluarga."
  }
];

export const facilities = [
  {
    title: "Instalasi Gawat Darurat (IGD 24 Jam)",
    badge: "Siaga 24 Jam",
    desc: "Ruang tindakan darurat dengan bed resusitasi, tabung oksigen bertekanan, alat monitor tanda vital, dan ambulans siaga.",
    image: "/assets/gambar4.png"
  },
  {
    title: "Kamar Rawat Inap Bersih & Nyaman",
    badge: "Kenyamanan Pasien",
    desc: "Kamar inap dengan pencahayaan alami, tempat tidur ergonomis medis, fasilitas pendamping, dan sirkulasi udara sehat.",
    image: "/assets/gambar3.jpg"
  },
  {
    title: "Laboratorium Diagnostik Terpadu",
    badge: "Standar Mutu Medis",
    desc: "Peralatan uji semi-otomatis hematologi dan kimia darah dengan prosedur sterilisasi ketat untuk hasil cepat dan presisi.",
    image: "/assets/gambar2.jpg"
  },
  {
    title: "Apotek & Ruang Resep Obat 24 Jam",
    badge: "Standar BPOM",
    desc: "Penyimpanan obat terstandar dengan kulkas khusus vaksin (cold chain), menjaga stabilitas obat hingga ke tangan pasien.",
    image: "/assets/gambar1.jpg"
  }
];

export const testimonials = [
  {
    name: "Ibu Siti Sarah (34 th)",
    branch: "Pasien Bojong Jengkol",
    category: "Poli KIA & Anak",
    text: "Pelayanan di Klinik dr. Suhendra sangat memuaskan dan tanggap. Ketika anak saya tiba-tiba panas tinggi tengah malam, tim IGD langsung menangani dengan tenang dan teliti. Dokternya ramah banget dan obatnya manjur.",
    rating: 5,
    verified: true
  },
  {
    name: "Bapak Budi Hermawan (48 th)",
    branch: "Pasien Medika Tapos",
    category: "Poli Umum & Tensi",
    text: "Tempatnya sangat bersih dan adem. Paling suka karena dokternya telaten mendengarkan keluhan pasien, tidak buru-buru. Biayanya juga sangat terjangkau untuk fasilitas selengkap ini.",
    rating: 5,
    verified: true
  },
  {
    name: "Ibu Anita Wijaya (29 th)",
    branch: "Pasien Ciampea Udik",
    category: "Laboratorium Darah",
    text: "Cek darah dan kolesterol prosesnya cepat sekali, perawat yang ambil darah tidak sakit sama sekali. Hasilnya keluar rapi dan dijelaskan dengan gamblang oleh dokter jaganya.",
    rating: 5,
    verified: true
  },
  {
    name: "Bapak Hendra Kurnia (52 th)",
    branch: "Pasien Rawat Inap",
    category: "Rawat Inap Observasi",
    text: "Saya sempat dirawat inap selama 2 hari karena demam berdarah. Ruangannya nyaman, perawat jaga rutin mengecek infus dan tensi dengan sopan santun. Terima kasih banyak Klinik dr. Suhendra!",
    rating: 5,
    verified: true
  }
];

export const healthArticles = [
  {
    id: "menjaga-daya-tahan-tubuh",
    category: "Kesehatan Umum",
    date: "24 Nov 2026",
    readTime: "3 Menit Baca",
    title: "5 Tips Ampuh Menjaga Daya Tahan Tubuh Keluarga di Musim Pancaroba",
    excerpt: "Perubahan cuaca yang drastis sering memicu flu dan batuk. Simak langkah preventif sederhana untuk menjaga imunitas seluruh anggota keluarga.",
    content: `Perubahan cuaca pancaroba yang tak menentu sering kali menjadi momen di mana berbagai virus dan bakteri lebih mudah berkembang biak. Berikut adalah langkah praktis yang dianjurkan oleh tim medis Klinik dr. Suhendra:

1. Perbanyak Konsumsi Air Putih Hangat
Cukupi kebutuhan cairan harian minimal 2 liter per hari. Air hangat membantu melancarkan metabolisme dan meredakan iritasi saluran pernapasan.

2. Prioritaskan Makanan Kaya Antioksidan
Tingkatkan asupan buah segar seperti jeruk, pepaya, dan sayuran hijau yang kaya vitamin C dan zinc untuk memperkuat pertahanan sel darah putih.

3. Tidur Cukup dan Teratur
Kurang tidur terbukti menurunkan produksi sitokin (protein pelindung tubuh). Pastikan orang dewasa tidur 7-8 jam dan anak-anak 9-10 jam setiap malam.

4. Jaga Kebersihan Tangan
Cuci tangan dengan sabun dan air mengalir selama minimal 20 detik setelah bepergian atau sebelum menyentuh makanan.

5. Jangan Menunda Konsultasi Medis
Jika demam berlangsung lebih dari 2 hari disertai nyeri sendi atau batuk berat, segera kunjungi dokter di Klinik dr. Suhendra terdekat untuk pemeriksaan laboratorium dini.`,
    author: "Tim Medis Klinik dr. Suhendra",
    image: "/assets/gambar1.jpg"
  },
  {
    id: "imunisasi-anak-lengkap",
    category: "Kesehatan Anak",
    date: "20 Nov 2026",
    readTime: "4 Menit Baca",
    title: "Pentingnya Imunisasi Dasar Lengkap untuk Melindungi Masa Depan Buah Hati",
    excerpt: "Vaksinasi adalah benteng pertahanan terbaik anak dari penyakit infeksi berbahaya. Pahami jadwal dan manfaat imunisasi bagi perkembangan si kecil.",
    content: `Imunisasi merupakan salah satu intervensi kesehatan masyarakat yang paling efektif dalam mencegah penyakit berbahaya seperti Hepatitis B, Polio, Campak, Difteri, dan Tetanus.

Mengapa Imunisasi Begitu Penting?
Tubuh bayi dan balita memiliki sistem imun yang masih berkembang. Vaksin bekerja dengan memperkenalkan fragmen mikroorganisme yang telah dilemahkan atau dimatikan, sehingga tubuh anak belajar membentuk antibodi spesifik tanpa harus jatuh sakit terlebih dahulu.

Jadwal Imunisasi Dasar Kemenkes:
- 0 Bulan: Hepatitis B (HB0)
- 1 Bulan: BCG, Polio 1
- 2 Bulan: DPT-HB-Hib 1, Polio 2, PCV 1, Rotavirus 1
- 3 Bulan: DPT-HB-Hib 2, Polio 3, PCV 2, Rotavirus 2
- 4 Bulan: DPT-HB-Hib 3, Polio 4, IPV
- 9 Bulan: Campak Rubella (MR)

Klinik dr. Suhendra melayani imunisasi dengan penyimpanan rantai dingin vaksin (cold-chain) yang terstandar sehingga potensi dan keamanan vaksin tetap terjaga optimal.`,
    author: "dr. Indah Permata",
    image: "/assets/gambar2.jpg"
  },
  {
    id: "penanganan-demam-anak",
    category: "Gawat Darurat",
    date: "16 Nov 2026",
    readTime: "3 Menit Baca",
    title: "Langkah Pertama yang Tepat Saat Anak Mengalami Demam Tinggi di Rumah",
    excerpt: "Jangan panik saat suhu tubuh si kecil melonjak. Ketahui pertolongan pertama di rumah serta tanda bahaya yang harus segera dibawa ke IGD.",
    content: `Demam adalah respons alami sistem kekebalan tubuh yang sedang melawan infeksi. Saat anak demam (suhu di atas 37.8°C), berikut langkah pertolongan pertama yang benar:

1. Beri Kompres Air Hangat (Bukan Air Es/Alkohol)
Kompres lipatan ketiak dan selangkangan dengan handuk hangat suam-suam kuku untuk membantu vasodilatasi pembuluh darah sehingga panas tubuh lebih cepat keluar.

2. Pakaikan Pakaian Tipis dan Menyerap Keringat
Hindari menyelimuti anak dengan selimut tebal bertumpuk karena justru dapat menjebak panas tubuh dan memicu kejang demam.

3. Jaga Asupan Cairan
Beri ASI lebih sering, air putih, atau sup hangat untuk mencegah dehidrasi.

4. Berikan Parasetamol Sesuai Dosis Berat Badan
Gunakan dosis berdasarkan berat badan anak, bukan semata-mata perkiraan usia.

Kapan Harus Segera ke IGD Klinik dr. Suhendra 24 Jam?
- Anak tampak sangat lemas, sulit dibangunkan, atau meracau.
- Terjadi kejang atau kaku kuduk.
- Nafas cepat, tersengal-sengal, atau tarikan dinding dada ke dalam.
- Muntah terus menerus hingga tidak ada cairan yang masuk.
- Demam mencapai 40°C atau lebih.`,
    author: "dr. Raudhatul Ulfha",
    image: "/assets/gambar4.png"
  },
  {
    id: "gaya-hidup-sehat-tensi",
    category: "Penyakit Dalam",
    date: "11 Nov 2026",
    readTime: "4 Menit Baca",
    title: "Mengontrol Tekanan Darah & Gula Darah Secara Alami di Usia Produktif",
    excerpt: "Hipertensi dan diabetes kerap dijuluki silent killer. Lakukan kebiasaan sehat ini untuk menjaga stabilitas organ vital Anda.",
    content: `Gaya hidup sedentary (kurang gerak) dan pola konsumsi tinggi garam atau gula menjadi faktor risiko utama peningkatan penyakit kardiovaskular pada usia muda dan produktif.

Prinsip C-E-R-D-I-K Kemenkes yang Disarankan:
1. Cek Kesehatan Berkala: Periksa tensi dan gula darah setidaknya sekali setiap bulan di klinik terdekat.
2. Enyahkan Asap Rokok: Nikotin mempersempit pembuluh darah dan meningkatkan beban pompa jantung.
3. Rajin Aktivitas Fisik: Lakukan jalan cepat atau senam aerobik minimal 30 menit sehari, 5 hari dalam seminggu.
4. Diet Sehat dengan Kalori Seimbang: Batasi konsumsi garam maksimal 1 sendok teh per hari dan gula maksimal 4 sendok makan.
5. Istirahat Cukup: Manajemen stres yang baik akan menstabilkan hormon kortisol dan adrenalin.
6. Kelola Stres: Luangkan waktu untuk hobi dan relaksasi pikiran.

Di Klinik dr. Suhendra, Anda dapat melakukan skrining berkala fungsi jantung, kolesterol, dan gula darah dengan konsultasi dokter yang ramah dan solutif.`,
    author: "dr. Ahmad Fauzi",
    image: "/assets/gambar3.jpg"
  },
  {
    id: "cek-kolesterol-rutin",
    category: "Laboratorium",
    date: "05 Nov 2026",
    readTime: "3 Menit Baca",
    title: "Pentingnya Cek Kolesterol & Asam Urat Rutin Sejak Usia 30 Tahun",
    excerpt: "Deteksi dini profil lipid dan asam urat sangat penting untuk mencegah risiko stroke dan serangan jantung di masa produktif.",
    content: `Banyak orang mengira pemeriksaan kolesterol hanya diperlukan oleh mereka yang sudah berusia lanjut atau memiliki berat badan berlebih. Faktanya, gaya hidup perkotaan masa kini meningkatkan risiko dislipidemia sejak usia 20-30 tahun.

Manfaat Pemeriksaan Laboratorium Rutin:
1. Mengetahui Kadar HDL, LDL, dan Trigliserida secara presisi.
2. Mencegah terbentuknya plak aterosklerosis pada pembuluh darah.
3. Mendapatkan saran pola makan dan suplemen yang terukur dari dokter.

Layanan laboratorium Klinik dr. Suhendra menyediakan paket pemeriksaan darah cepat dengan hasil akurat dalam waktu kurang dari 30 menit.`,
    author: "dr. Tan Wily Ramadhani",
    image: "/assets/gambar2.jpg"
  },
  {
    id: "pertolongan-pertama-luka-bakar",
    category: "Pertolongan Pertama",
    date: "01 Nov 2026",
    readTime: "4 Menit Baca",
    title: "Panduan Medis Pertolongan Pertama Luka Bakar & Cedera Ringan di Rumah",
    excerpt: "Hindari mengoleskan pasta gigi atau kecap pada luka bakar. Pelajari langkah ilmiah yang aman untuk meminimalkan kerusakan jaringan kulit.",
    content: `Kesalahan fatal yang sering terjadi di masyarakat saat mengalami luka bakar ringan adalah mengoleskan bahan rumahan seperti odol, mentega, atau minyak goreng. Hal ini justru memicu infeksi sekunder dan memperparah kerusakan jaringan.

Langkah Pertama yang Benar:
1. Guyur dengan Air Mengalir Bersuhu Ruang selama 15-20 menit.
2. Lepaskan pakaian atau perhiasan di sekitar area luka sebelum terjadi pembengkakan.
3. Tutup dengan kasa steril yang lembap dan bersih.
4. Segera periksakan ke IGD Klinik dr. Suhendra jika timbul lepuhan besar atau luka bakar di area wajah dan persendian.`,
    author: "dr. Eri",
    image: "/assets/gambar1.jpg"
  }
];

export const insurancePartners = [
  { name: "BPJS Kesehatan", logoText: "BPJS Kesehatan", supported: "Menerima Peserta Faskes 1 & Rujukan" },
  { name: "Mandiri Inhealth", logoText: "Mandiri Inhealth", supported: "Cashless & Reimbursement" },
  { name: "Prudential Indonesia", logoText: "Prudential", supported: "Klaim Asuransi Rawat Inap" },
  { name: "AdMedika", logoText: "AdMedika", supported: "Third Party Administrator" },
  { name: "Allianz Life", logoText: "Allianz", supported: "Layanan Pasien Asuransi Swasta" },
  { name: "Sinarmas MSIG", logoText: "Sinarmas", supported: "Jaminan Pembiayaan Kesehatan" }
];
