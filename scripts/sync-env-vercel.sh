#!/usr/bin/env bash
set -e

export PATH=$PATH:/usr/local/bin:/opt/homebrew/bin

echo "=== Sinkronisasi .env.local ke Vercel ==="

if [ ! -f .env.local ]; then
  echo "Error: File .env.local tidak ditemukan."
  exit 1
fi

if ! vercel whoami >/dev/null 2>&1; then
  echo "⚠️ Status Vercel CLI: Belum login."
  echo "Silakan jalankan perintah ini di terminal Anda:"
  echo "  vercel login"
  echo "Lalu link project ini ke Vercel:"
  echo "  vercel link"
  echo "Kemudian jalankan kembali: npm run sync-env"
  exit 1
fi

echo "✓ Vercel CLI terautentikasi."
echo "Mengunggah variabel lingkungan ke Vercel (Production, Preview, Development)..."

while IFS='=' read -r key value || [ -n "$key" ]; do
  # Lewati komentar dan baris kosong
  [[ "$key" =~ ^#.*$ ]] && continue
  [[ -z "$key" ]] && continue
  
  # Bersihkan whitespace
  key=$(echo "$key" | xargs)
  value=$(echo "$value" | xargs)

  if [ -n "$key" ] && [ -n "$value" ]; then
    echo "  → Menambahkan $key..."
    vercel env add "$key" --environment production,preview,development --value "$value" --yes --force
  fi
done < .env.local

echo "✅ Berhasil! Seluruh variabel .env.local telah tersimpan di Vercel."
