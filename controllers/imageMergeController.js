const fs = require('fs');
const sharp = require('sharp');

const mergeImagesController = async (req, res, next) => {
    try {
        // 가장 작은 이미지의 너비를 minWidth로 설정
        const imagesInfo = await Promise.all(req.files.map(file => sharp(file.path).metadata()));
        const minWidth = Math.min(...imagesInfo.map(info => info.width));

        // 각 이미지의 크기를 조정하고 조정된 높이 구하기
        const resizedImages = await Promise.all(req.files.map(file =>
            sharp(file.path)
                .resize({ width: minWidth })
                .toBuffer()
        ));

        // 조정된 이미지의 높이를 모두 더해 캔버스의 높이를 구하기
        const resizedImagesInfo = await Promise.all(resizedImages.map(image => sharp(image).metadata()));
        const canvasHeight = resizedImagesInfo.reduce((sum, info) => sum + info.height, 0);

        // 새 이미지의 초기 설정
        const newImage = sharp({
            create: {
                width: minWidth,
                height: canvasHeight,
                channels: 4,
                background: { r: 0, g: 0, b: 0 }
            }
        });

        let yPosition = 0;
        // 각 이미지의 위치를 계산하여 배열에 저장
        const images = resizedImages.map((image, index) => {
            const imageToAdd = {
                input: image,
                top: yPosition,
                left: 0
            };
            yPosition += resizedImagesInfo[index].height; // 조정된 높이를 사용
            return imageToAdd;
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

        // sharp 캐시 비활성화
        sharp.cache(false);

        // 업로드된 이미지 파일 삭제
        req.files.forEach(file => {
            fs.unlink(file.path, err => {
                if (err) {
                    console.error(`Error while deleting file ${file.path}:`, err);
                }
            });
        });

        // 합친 이미지 반환
        res.render('index', { image: '/merged/' + fileName });
    } catch (error) {
        console.error(error);
        next(error);
    }
};



module.exports = {
    mergeImages: mergeImagesController
};
