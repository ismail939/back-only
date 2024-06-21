const cloudinary = require('cloudinary').v2;
const appError = require('../utils/appError')
const httpStatusCode = require('../utils/httpStatusText');
const { compressImage } = require('./sharp');
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET 
});

const uploadToCloud = (req, folderName) => {
    return new Promise((resolve, reject) => {
        let oneFile = false
        if (!req.file && !req.files) {
            const error = appError.create("No images provided", 400, httpStatusCode.ERROR);
            return reject(error);
        }
        if(!req.files){
            req.files = [req.file]
            oneFile = true
        }
        const uploadedFiles = [];
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];

        req.files.forEach(async(file, index) => {
            if (!acceptedFormats.includes(file.mimetype)) {
                const error = appError.create(`Unacceptable Type Format For Image ${index + 1}`, 415, httpStatusCode.ERROR);
                return reject(error);
            }
            if(file.buffer.byteLength>700000){
                file.buffer = await compressImage(file.buffer)
            }
           
            const uniqueSuffix = Date.now() + '.' + file.originalname.split('.')[1]; // Unique name for each file

            cloudinary.uploader.upload_stream({ 
                resource_type: 'image', 
                public_id: uniqueSuffix, 
                overwrite: true, 
                folder: folderName
            }, 
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                uploadedFiles.push({
                    img: result.url,
                    imgName: uniqueSuffix
                });
                
                // Check if all files have been uploaded
                if (oneFile) {
                    req.body.img = uploadedFiles[0].img
                    req.body.imgName = uploadedFiles[0].imgName
                    resolve(uploadedFiles);
                }else if(uploadedFiles.length === req.files.length){
                    req.body.photos = uploadedFiles
                    resolve(uploadedFiles);
                }
            }).end(file.buffer);
        });
    });
};


const deleteFromCloud = async(publicId)=>{
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return true
    } catch (error) {
        console.error('Error deleting image:', error);
    }
}

module.exports = {uploadToCloud, deleteFromCloud}
