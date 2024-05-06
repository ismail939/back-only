const cloudinary = require('cloudinary').v2;
const appError = require('../utils/appError')
const httpStatusCode = require('../utils/httpStatusText')
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET 
});

// const uploadToCloud = (req, folderName) => {
//     return new Promise((resolve, reject) => {
//         if (!req.file) {
//             const error = appError.create("There is no image provided", 400, httpStatusCode.ERROR);
//             return reject(error);
//         }

//         const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
//         if (!acceptedFormats.includes(req.file.mimetype)) {
//             const error = appError.create("Unacceptable Type Format For Image", 415, httpStatusCode.ERROR);
//             return reject(error);
//         }

//         const uniqueSuffix = Date.now() + "." + req.file.originalname.split('.')[1];
//         cloudinary.uploader.upload_stream({ 
//             resource_type: 'image', 
//             public_id: uniqueSuffix, 
//             overwrite: true, 
//             folder: folderName
//         }, 
//         (error, result) => {
//             if (error) {
//                 return reject(error);
//             }
//             req.body.img = result.url;
//             req.body.imgName = uniqueSuffix;
//             resolve(req.body);
//         }).end(req.file.buffer);
//     });
// };

const uploadToCloud = (req, folderName) => {
    return new Promise((resolve, reject) => {
        if (!req.files || req.files.length === 0) {
            const error = appError.create("No images provided", 400, httpStatusCode.ERROR);
            return reject(error);
        }

        const uploadedFiles = [];
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];

        req.files.forEach((file, index) => {
            if (!acceptedFormats.includes(file.mimetype)) {
                const error = appError.create(`Unacceptable Type Format For Image ${index + 1}`, 415, httpStatusCode.ERROR);
                return reject(error);
            }

            const uniqueSuffix = Date.now() + '_' + file.originalname.split('.')[0]; // Unique name for each file

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
                if (uploadedFiles.length === req.files.length) {
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
