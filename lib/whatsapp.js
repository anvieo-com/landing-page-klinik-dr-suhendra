import { clinicInfo } from '@/data/clinicData';

/**
 * Menghasilkan URL WhatsApp resmi untuk pendaftaran / booking janji temu
 * Nomor WhatsApp: 6282311188250 (0823-1118-8250)
 */
export function getWhatsAppBookingUrl(options = {}) {
  const phone = clinicInfo?.whatsapp || '6282311188250';
  let message = 'Halo Klinik dr. Suhendra, saya ingin membuat janji temu / konsultasi pendaftaran online.';

  if (options) {
    if (typeof options === 'string') {
      message = options;
    } else if (options.doctor) {
      const docName = typeof options.doctor === 'string' ? options.doctor : options.doctor.name;
      const docPoli = options.doctor?.poli ? ` (${options.doctor.poli})` : '';
      message = `Halo Klinik dr. Suhendra, saya ingin membuat janji temu dengan ${docName}${docPoli}.`;
    } else if (options.service) {
      message = `Halo Klinik dr. Suhendra, saya ingin membuat janji temu untuk layanan ${options.service}.`;
    } else if (options.branch) {
      const branchName = typeof options.branch === 'string' ? options.branch : options.branch.name || options.branch.shortName;
      message = `Halo Klinik dr. Suhendra, saya ingin membuat janji temu di cabang ${branchName}.`;
    }
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Membuka link WhatsApp pendaftaran langsung di tab baru (tanpa form modal)
 */
export function openWhatsAppBooking(options = {}) {
  const url = getWhatsAppBookingUrl(options);
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
