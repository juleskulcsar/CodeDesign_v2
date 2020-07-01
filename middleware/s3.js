const aws = require('aws-sdk');
const fs = require('fs');

let secrets;
if (process.env.NODE_ENV == 'development') {
  secrets = process.env;
}

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
});

exports.upload = (req, res, next) => {
  const { file } = req;
  if (!file) {
    console.log('Multer failed');
    return res.sendStatus(500);
  }
  const { filename, mimetype, size, path } = req.file;

  s3.putObject({
    Bucket: 'discoimageboard',
    ACL: 'public-read',
    Key: filename,
    Body: fs.createReadStream(path),
    ContentType: mimetype,
    ContentLength: size
  })
    .promise()
    .then(data => {
      console.log('data in s3:', data);
      next();
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
    .then(fs.promises.unlink(path));
  //this is to delete the file
}; //closes exports.upload
