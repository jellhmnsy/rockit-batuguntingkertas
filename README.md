# README: Cara Menjalankan Project React Native dengan Expo

## Prasyarat
Pastikan Anda telah menginstal prasyarat berikut di sistem Anda:

1. **Node.js** (disarankan versi terbaru LTS)
2. **npm** atau **Yarn** (terinstal bersama Node.js)
3. **Expo CLI**
4. **Expo Go App** di perangkat Android atau iOS Anda

### Langkah Instalasi
1. Pastikan Anda memiliki Node.js:
   ```bash
   node -v
   ```

2. Pastikan Anda memiliki npm atau Yarn:
   ```bash
   npm -v
   yarn -v
   ```

3. Instal Expo CLI:
   ```bash
   npm install -g expo-cli
   ```

## Menjalankan Project

1. **Clone Repository**
   Clone project ini dari repository menggunakan perintah:
   ```bash
   git clone <repository-url>
   cd <nama-folder-project>
   ```

2. **Instal Dependensi**
   Jalankan perintah berikut untuk menginstal semua dependensi yang diperlukan:
   ```bash
   npm install
   ```

3. **Jalankan Aplikasi dengan Expo**
   Jalankan perintah berikut untuk memulai server Expo:
   ```bash
   npx expo start
   ```

4. **Scan QR Code**
   - Setelah server Expo berjalan, Anda akan melihat QR Code di terminal atau di browser.
   - Buka aplikasi **Expo Go** di perangkat Anda (Android/iOS).
   - Scan QR Code tersebut menggunakan Expo Go.

5. **Aplikasi Berjalan di Perangkat**
   Aplikasi akan dimuat dan dijalankan langsung di perangkat Anda melalui Expo Go.

## Catatan Tambahan
- Jika Anda mengalami masalah saat menjalankan aplikasi, pastikan Anda telah mengikuti dokumentasi resmi dari [Expo](https://docs.expo.dev/get-started/installation/).
- Untuk melakukan debugging, gunakan tools yang disediakan oleh Expo seperti console log di browser.
- Anda juga dapat menjalankan aplikasi di emulator, tetapi Expo Go direkomendasikan untuk proses yang lebih sederhana.
