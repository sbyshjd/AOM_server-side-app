const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const{ uuidv4 } = require('uuidv4');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'architecture-office-management-app',
      format: async (req, file) => 'png', // supports promises as well
      public_id: (req, file) => uuidv4(),
    },
  });
  
  const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;