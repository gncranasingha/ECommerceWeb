const cloudinary = require("cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: "dysu3a9us",
    api_key: "658685274693512",
    api_secret: "w0LXdikGzKXVfrabwErk2fyE4LA",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file){
    const result = await cloudinary.UploadStream.upload(file, {
        resource_type : 'auto'
    })

    return result;
}

const upload = multer({storage})

module.exports = {upload, imageUploadUtil};