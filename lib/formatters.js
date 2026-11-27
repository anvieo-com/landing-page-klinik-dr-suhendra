/**
 * Format angka ke notasi ringkas (shorthand notation)
 * Contoh:
 * 50000 -> "50k"
 * 1500000 -> "1.5jt"
 * 1000000000 -> "1M"
 */
export function formatCompactNumber(number, suffix = '') {
  if (typeof number !== 'number') return `${number}${suffix}`;
  
  if (number >= 1_000_000_000) {
    const val = (number / 1_000_000_000).toFixed(number % 1_000_000_000 === 0 ? 0 : 1);
    return `${val}M${suffix}`;
  }
  if (number >= 1_000_000) {
    const val = (number / 1_000_000).toFixed(number % 1_000_000 === 0 ? 0 : 1);
    return `${val}jt${suffix}`;
  }
  if (number >= 1_000) {
    const val = (number / 1_000).toFixed(number % 1_000 === 0 ? 0 : 1);
    return `${val}k${suffix}`;
  }
  return `${number}${suffix}`;
}
