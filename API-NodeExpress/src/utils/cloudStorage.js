const util = require('util');
const { Storage } = require('@google-cloud/storage');

const keyFilename = 'workflow-express-bucket.json';
const storage = new Storage({ keyFilename });
const bucketName = 'workflow-express-bucket';
const bucket = storage.bucket(bucketName);

exports.uploadImage = (file) => new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
        resumable: false
    });

    blobStream
        .on('finish', () => {
            const publicUrl = util.format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );

            resolve(publicUrl);
        })
        .on('error', (err) => {
            console.log(err);
            reject(`Unable to upload image, something went wrong`);
        })
        .end(buffer);
});
