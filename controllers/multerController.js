const multer = require('multer');
const path = require('path');

// multer를 사용하여 파일 저장 위치 및 이름 설정
const storage = multer.diskStorage({
    // 파일 저장 위치 설정
    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },
    // 파일 이름 설정
    filename: function(req, file, cb) {
        // 파일 확장자 가져오기
        const ext = path.extname(file.originalname);
        // 파일 이름에 날짜, 시간, 그리고 랜덤한 숫자를 포함
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + ext);
    }
});

// 파일 확장자 필터 정의
const fileFilter = (req, file, cb) => {
    // 허용하는 파일 형식
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    // file.mimetype에는 파일의 MIME 타입이 포함
    if (!allowedTypes.includes(file.mimetype)) { // 허용하지 않는 파일 형식이면 에러를 반환
        cb(new Error("Invalid file type"), false);
        return;
    }
    cb(null, true);
};

// multer 설정
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 8 }, // 8MB 크기 제한
    fileFilter: fileFilter
});

module.exports = {
    upload
};
