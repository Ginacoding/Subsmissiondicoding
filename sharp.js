const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Folder tujuan untuk gambar asli dan folder output
const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist');

// Membuat folder tujuan jika belum ada
if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

// Membaca semua file gambar dalam folder 'heros'
fs.readdirSync(target).forEach(image => {
  const imagePath = path.join(target, image); // Path lengkap gambar asli

  // Memastikan file adalah gambar dengan ekstensi .jpg
  if (path.extname(image).toLowerCase() === '.jpg') {
    // Mengubah ukuran gambar untuk versi desktop
    sharp(imagePath)
      .resize(1200) // Ukuran untuk desktop
      .jpeg({
        quality: 80,
        progressive: true,
        force: true,
      })
      .toFile(path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-large.jpg`), (err, info) => {
        if (err) {
          console.error('Error processing large image:', err);
        } else {
          console.log('Processed large image:', info);
        }
      }); // Output gambar besar

    // Mengubah ukuran gambar untuk versi mobile
    sharp(imagePath)
      .resize(600) // Ukuran untuk mobile
      .jpeg({
        quality: 80,
        progressive: true,
        force: true,
      })
      .toFile(path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-small.jpg`), (err, info) => {
        if (err) {
          console.error('Error processing small image:', err);
        } else {
          console.log('Processed small image:', info);
        }
      }); // Output gambar kecil
  }
});
