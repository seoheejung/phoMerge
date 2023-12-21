const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

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
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB 크기 제한
    fileFilter: fileFilter
});

// 이미지 합치기 컨트롤러
const mergeImagesController = async (req, res, next) => {
    try {
        // 업로드된 모든 이미지의 메타데이터 가져오기
        const imagesInfo = await Promise.all(req.files.map(file => sharp(file.path).metadata()));
        // 모든 이미지의 높이를 합친 값을 maxHeight로 설정
        const maxHeight = imagesInfo.reduce((sum, info) => sum + info.height, 0);
        // 가장 넓은 이미지의 너비를 maxWidth로 설정
        const maxWidth = Math.max(...imagesInfo.map(info => info.width));

        // 새 이미지의 초기 설정
        const newImage = sharp({
            create: {
                width: maxWidth,
                height: maxHeight,
                channels: 4,
                background: { r: 0, g: 0, b: 0 }
            }
        });

        let yPosition = 0;
        // 각 이미지의 위치를 계산하여 배열에 저장
        const images = req.files.map((file, index) => {
            const image = {
                input: file.path,
                top: yPosition,
                left: 0
            };
            yPosition += imagesInfo[index].height;
            return image;
        });

        // 'merged' 폴더가 없으면 생성
        if (!fs.existsSync('./public/merged')) {
            fs.mkdirSync('./public/merged');
        }

        // 합치려는 이미지의 이름 설정
        const fileName = Date.now() + '.png';
        const outputPath = './public/merged/' + fileName;

        // 이미지 합치기
        await newImage
            .composite(images)
            .toFile(outputPath);

        // 합친 이미지 반환
        res.render('index', { image: '/merged/' + fileName });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    upload,
    mergeImages: mergeImagesController
};
