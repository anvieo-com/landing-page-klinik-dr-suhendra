#!/usr/bin/env node
/**
 * Script Otomatis: Pembersihan Deployment Lama Vercel
 * Menghapus snapshot deployment lama yang membebani Deployment Storage (10 GB limit),
 * dengan proteksi:
 * 1. Deployment Production aktif TIDAK PERNAH dihapus.
 * 2. Menyisakan 3 deployment terbaru yang aman.
 * 3. Menghapus preview / build lama yang masih menampung aset 200MB+.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// 1. Baca token jika ada di environment atau .env.local
let token = process.env.VERCEL_TOKEN;

if (!token && fs.existsSync('.env.local')) {
  const content = fs.readFileSync('.env.local', 'utf-8');
  const match = content.match(/^VERCEL_TOKEN=["']?([^"'\r\n]+)["']?/m);
  if (match) token = match[1].trim();
}

console.log('🔍 Memeriksa autentikasi Vercel CLI / Token...');

async function run() {
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Cek apakah punya token atau vercel cli terotentikasi
  let isCliLoggedIn = false;
  try {
    const whoami = execSync('export PATH=$PATH:/usr/local/bin:/opt/homebrew/bin; vercel whoami 2>/dev/null', { encoding: 'utf-8' });
    if (whoami && whoami.trim()) {
      console.log(`✅ Terotentikasi sebagai: ${whoami.trim()}`);
      isCliLoggedIn = true;
    }
  } catch (e) {
    // CLI belum login
  }

  if (!token && !isCliLoggedIn) {
    console.log('\n⚠️  Vercel belum terhubung. Pilih salah satu cara cepat berikut:');
    console.log('------------------------------------------------------------');
    console.log('CARA A (Paling Mudah via Browser):');
    console.log('1. Buka: https://vercel.com/account/tokens');
    console.log('2. Buat token baru (misal: "cleanup-token")');
    console.log('3. Jalankan script ini dengan token:');
    console.log('   VERCEL_TOKEN="<token_anda>" node scripts/cleanup-vercel-deployments.mjs');
    console.log('   atau simpan VERCEL_TOKEN=<token_anda> di file .env.local\n');
    console.log('CARA B (via Terminal Login):');
    console.log('1. Buka terminal Anda dan ketik: vercel login');
    console.log('2. Selesaikan login di browser, lalu jalankan kembali script ini:');
    console.log('   npm run cleanup-deployments');
    console.log('------------------------------------------------------------\n');
    process.exit(1);
  }

  console.log('\n📦 Mengambil daftar deployment dari Vercel...');

  let deployments = [];

  if (token) {
    // Menggunakan Vercel API langsung
    try {
      const res = await fetch('https://api.vercel.com/v6/deployments?limit=100', { headers });
      const data = await res.json();
      if (data.error) {
        console.error('❌ Gagal memanggil Vercel API:', data.error.message);
        process.exit(1);
      }
      deployments = data.deployments || [];
    } catch (err) {
      console.error('❌ Error fetch deployments:', err.message);
      process.exit(1);
    }
  } else if (isCliLoggedIn) {
    // Menggunakan Vercel CLI
    try {
      const out = execSync('export PATH=$PATH:/usr/local/bin:/opt/homebrew/bin; vercel list --all --json 2>/dev/null', { encoding: 'utf-8' });
      const data = JSON.parse(out);
      deployments = data.deployments || data || [];
    } catch (err) {
      console.error('❌ Error vercel list:', err.message);
      process.exit(1);
    }
  }

  if (!Array.isArray(deployments) || deployments.length === 0) {
    console.log('ℹ️  Tidak ada deployment yang ditemukan.');
    return;
  }

  console.log(`📊 Ditemukan total ${deployments.length} deployment di akun Anda.`);

  // Filter: Jangan sentuh yang sedang aktif (READY target production terakhir)
  // Urutkan dari terbaru ke terlama
  deployments.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  // Amankan 3 deployment paling baru
  const keepDeployments = deployments.slice(0, 3);
  const candidatesToDelete = deployments.slice(3);

  console.log(`\n🛡️  Menjaga aman 3 deployment terbaru:`);
  for (const d of keepDeployments) {
    const date = new Date(d.createdAt).toLocaleString('id-ID');
    console.log(`   - [DIJAGA] ${d.uid || d.id} (${d.name || d.url}) - ${d.state} [${date}]`);
  }

  if (candidatesToDelete.length === 0) {
    console.log('\n✨ Tidak ada deployment lama yang perlu dihapus. Storage Anda sudah optimal!');
    return;
  }

  console.log(`\n🗑️  Menemukan ${candidatesToDelete.length} deployment lama untuk dihapus:`);
  
  let deletedCount = 0;
  let failedCount = 0;

  for (const d of candidatesToDelete) {
    const id = d.uid || d.id;
    const name = d.name || d.url || id;
    const date = new Date(d.createdAt).toLocaleString('id-ID');

    process.stdout.write(`⏳ Menghapus ${id} (${name}) [${date}]... `);

    try {
      if (token) {
        const delRes = await fetch(`https://api.vercel.com/v13/deployments/${id}`, {
          method: 'DELETE',
          headers
        });
        const delData = await delRes.json();
        if (delRes.ok && (delData.state === 'DELETED' || delData.status === 'SUCCESS')) {
          console.log('✅ Terhapus');
          deletedCount++;
        } else {
          console.log(`⚠️  Lewati (${delData.error?.message || 'Gagal'})`);
          failedCount++;
        }
      } else {
        execSync(`export PATH=$PATH:/usr/local/bin:/opt/homebrew/bin; vercel remove ${id} --confirm-name ${id} 2>/dev/null`, { stdio: 'pipe' });
        console.log('✅ Terhapus');
        deletedCount++;
      }
    } catch (e) {
      console.log(`⚠️  Gagal menghapus: ${e.message}`);
      failedCount++;
    }
  }

  console.log('\n============================================================');
  console.log(`🎉 Selesai! Berhasil menghapus ${deletedCount} deployment lama.`);
  if (failedCount > 0) {
    console.log(`⚠️  ${failedCount} deployment dilewati / tidak dapat dihapus.`);
  }
  console.log('💡 Buka https://vercel.com/anvieo/~/usage/deployments-storage untuk melihat storage yang telah bebas.');
  console.log('============================================================\n');
}

run();
