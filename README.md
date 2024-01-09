## 📫 node.JS의 sharp 모듈로 이미지 병합 서비스 만들기

### ✨ 사이트 주소
http://localhost:3000

### 📌 과정
1. 사용자로부터 이미지 최대 4장 받기
2. 업로드된 모든 이미지의 메타데이터 가져와 모든 이미지의 높이를 합친 값과 가장 넓은 이미지의 너비를 가진 새 이미지 생성
3. 기존 이미지의 위치를 순서대로 계산하여 새 이미지와 병합
4. 사용자에게 병합된 이미지 반환

#### 💡 필요 패키지
```
npm install path fs node-schedule node-schedule sharp multer nodemon moment
```
#### 💡 프로젝트 구조
```
- controllers
  - imageMergeController.js # 이미지 병합 컨트롤러
  - multerController.js # 이미지 업로드 컨트롤러
  - scheduleController.js # 이미지 삭제 스케쥴러 컨트롤러
- public
  - css # css 파일이 있는 폴더
  - JS # js 파일이 있는 폴더
  - image # 이미지 파일이 있는 폴더
  - merged # 병합된 이미지가 저장되는 폴더
  - uploads # 업로드된 이미지가 저장되는 폴더
- routes # 라우터 관리 폴더
- view # ejs 폴더
- app.js
```

#### ⏲ 스케쥴러 관리
1. uploadsDir : 10분 마다 삭제 예정 (업로드된 이미지 파일 삭제로 스케줄러 제거)
2. mergeDir : 1시간 마다 삭제 예정
```
    // 10분마다 실행
    schedule.scheduleJob('*/10 * * * *', () => {
        console.log('[' + moment().format("YYYY-MM-DD hh:mm") + '] uploadsDir delete')
        deleteFilesInDir(uploadsDirPath);
    });


    // 1시간마다 실행
    schedule.scheduleJob('0 */1 * * *', () => {
        console.log('mergeDir delete')
        deleteFilesInDir(mergeDirPath);
    });

    // 매일 5시 30분에 실행
    schedule.scheduleJob('41 0 * * *', () => {
        deleteFilesInDir(mergeDirPath);
    });
```


#### 💡 배포 방법 (임시)
```
npm i -D @babel/core @babel/node @babel/preset-env
```

#### 💬 이후 작업
```
CSS 작업
서버  적용 (구름 IDE 적용 예정)
구글 웹마스터 적용
네이버 웹마스터 적용
```