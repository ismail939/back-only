const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET 
});

const uploadToCloud = (req, folderName, next)=>{
    if(!req.file){
        const error = appError.create("There is no image provided", 400, httpStatusCode.ERROR)
        return next(error)
    }
    const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!acceptedFormats.includes(file.mimetype)) {
        const error = appError.create("Unacceptable Type Format For Image", 415, httpStatusCode.ERROR)
        return next(error)
    }
    const uniqueSuffix = Date.now() + "." + req.file.originalname.split('.')[1];
    cloudinary.uploader.upload_stream({ 
        resource_type: 'image', 
        public_id: uniqueSuffix, 
        overwrite: true, 
        folder: folderName
    }, 
    (error, result) => {
        if (error) {
            return next(error)
        }
    }
    ).end(req.file.buffer); 
}

module.exports = {uploadToCloud}
