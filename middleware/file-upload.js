var multer = require('multer');
var uidSafe = require('uid-safe');
var path = require('path');

const diskStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + '/uploads');
  },
  filename: function(req, file, callback) {
    uidSafe(24).then(function(uid) {
      callback(null, uid + path.extname(file.originalname));
    });
  }
});

const fileUpload = multer({
  storage: diskStorage,
  limits: {
    fileSize: 2097152
  }
});

module.exports = fileUpload;
