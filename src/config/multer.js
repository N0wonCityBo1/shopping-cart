const { ConnectionStates } = require("mongoose");
const multer = require("multer");
const path = require("path");
//이미지 업로드
const _storage = multer.diskStorage({
    destination: (req, res, cb) => {
         cb(null, "files/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname );
    }
});
// 파일검사
const fileFilter = (req, file, cb) => {
    

    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('이미지가 아닙니다!', 400), false);
    }
};
exports.upload = multer({
    
    storage: _storage,    
  
    limits: {
        fileSize: 1024 * 1024 * 6
    },
}).single('image');

