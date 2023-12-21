const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');

// 디렉토리 경로를 설정
const uploadsDirPath = path.join(__dirname, '../public/uploads'); 
const mergeDirPath = path.join(__dirname, '../public/merged');

// 디렉토리 내의 모든 파일을 삭제
const deleteFilesInDir = (directoryPath) => {
    // 디렉토리 읽어오기
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.log(`Unable to scan directory: ${err}`);
        }

        // 디렉토리 내의 각 파일에 대해
        files.forEach((file) => {
            // fs.unlink 메소드를 사용하여 파일을 삭제
            fs.unlink(path.join(directoryPath, file), err => {
                if (err) {
                    console.error(err);
                }
            });
        });
    });
}

const scheduleFileDeletion = () => {
    // 10분마다 실행
    schedule.scheduleJob('*/10 * * * *', () => {
        console.log('uploadsDir delete')
        deleteFilesInDir(uploadsDirPath);
    });

    // 2시간마다 실행
    schedule.scheduleJob('0 */2 * * *', () => {
        console.log('mergeDir delete')
        deleteFilesInDir(mergeDirPath);
    });
}

module.exports = scheduleFileDeletion;
