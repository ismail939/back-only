const sharp = require('sharp')
const fs = require('fs')

inputFile = './2MB photo.png'
outputFile = 'compressed.jpeg'
const start = performance.now()
sharp(inputFile)
  .jpeg({ quality: 80 }) // Compress JPEG with quality 80
  .toBuffer((err, buffer, info) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Output file:', buffer.byteLength);
      fs.writeFileSync('compressed.jpeg', buffer)
    }
  });

const end = performance.now()

console.log()