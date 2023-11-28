const {v2} = require('cloudinary');

//const {CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY} = require('../config/config.js');
/*
Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
  "cloud_name", "cinemas01",
  "api_key", "541646831289726",
  "api_secret", "l2eOIyahgn9Fb87BajNLcd_iP_0"));*/
  const uploadImage = async (filePath) => {
    /*return await v2.uploader.upload(filePath, {
      folder: 'replit' //se guarda en la carpeta relpit
    })*/
    try {
      return await v2.uploader.upload(filePath, { 
        folder: 'replit'
      });
    } catch (error) {
      console.error('Error al subir la imagen a Cloudinary:', error);
      throw error; 
    }
  }
  exports.uploadImage = uploadImage;

module.exports ={
//v2.config({
  cloudinary: {
  cloud_name: 'cinemas01', 
  api_key: '541646831289726', 
  api_secret: 'l2eOIyahgn9Fb87BajNLcd_iP_0',
  //preset: 'cinema',
  secure: true
},
uploadImage
}
/*
const uploadImage = async (filePath) => {
  /*return await v2.uploader.upload(filePath, {
    folder: 'replit' //se guarda en la carpeta relpit
  })
  try {
    return await v2.uploader.upload(filePath, { 
      folder: 'replit'
    });
  } catch (error) {
    console.error('Error al subir la imagen a Cloudinary:', error);
    throw error; 
  }
}
exports.uploadImage = uploadImage;
*/
const deleteImage = async (publicId) => {
  try {
    return await v2.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error al borrar la imagen a Cloudinary:', error);
    throw error; 
  }
}
exports.deleteImage = deleteImage;