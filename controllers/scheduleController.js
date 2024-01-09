const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

// 디렉토리 경로를 설정
const uploadsDirPath = path.join(__dirname, '../public/uploads'); 
const mergeDirPath = path.join(__dirname, '../public/merged');

// 디렉토리 내의 모든 파일을 삭제
const deleteFilesInDir = (directoryPath) => {
    try {
        // 디렉토리 읽어오기
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                throw new Error(`Unable to scan directory: ${err}`);
            }

            // 디렉토리 내의 각 파일에 대해
            files.forEach((file) => {
                // fs.unlink 메소드를 사용하여 파일을 삭제
                fs.unlink(path.join(directoryPath, file), err => {
                    if (err) {
                        throw new Error(err);
                    }
                });
            });
        });
    } catch (error) {
        console.error(`Error occurred in deleteFilesInDir: ${error}`);
    }
}

const scheduleFileDeletion = () => {
    try {
        schedule.scheduleJob('0 */1 * * *', () => {
            console.log('[' + moment().format("YYYY-MM-DD hh:mm") + '] mergeDir delete')
            deleteFilesInDir(mergeDirPath);
        });
    } catch (error) {
        console.error(`Error occurred in scheduleFileDeletion: ${error}`);
    }
}

module.exports = scheduleFileDeletion;
