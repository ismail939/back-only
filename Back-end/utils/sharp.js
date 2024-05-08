const sharp = require('sharp')


const compressImage = async (fileBuffer) => {
    try {
      const compressedBuffer = await sharp(fileBuffer)
        .jpeg({ quality: 70 }) // Compress JPEG with quality 80
        .toBuffer();
        
      return compressedBuffer
    } catch (err) {
        console.log(err)
      console.error('Error:', err);
      throw err; // Rethrow the error to be handled by the caller
    }
  };

module.exports = {compressImage}
