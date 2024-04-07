const gc = require('../config/cloud');
const bucket = gc.bucket('myproject-yura');

const uploadImage = (file) =>
    new Promise((resolve, reject) => {
        const { name, data: buffer } = file;
        const originalname = Date.now().toString() + name;
        const blob = bucket.file(originalname.replace(/ /g, '_'));
        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream
            .on('finish', () => {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                resolve(publicUrl);
            })
            .on('error', (error) => {
                console.error('error: ', error);
                reject(`Unable to upload image, something went wrong`);
            })
            .end(buffer);
    });

module.exports = uploadImage;
