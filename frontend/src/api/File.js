const express = require('express');
const fs = require('fs');
const path = require('path'); // path 모듈을 추가합니다.
const app = express();
const port = 3000;

app.get('/api/file/:uuid', (req, res) => {
    const uuid = req.params.uuid;
    const schema = 'download'; // schema 값을 변경하려면 원하는 값으로 설정합니다.

    // 파일 경로 생성
    const userHome = process.env.HOME || process.env.USERPROFILE; // 사용자의 홈 디렉토리 가져오기
    const erpFilePath = path.join(userHome, 'Desktop', 'ERP_FILE', schema, uuid); // 파일 경로 생성

    fs.readFile(erpFilePath, (err, data) => {
        if (err) {
            console.error('파일 읽기 오류:', err);
            res.status(500).send('파일을 찾을 수 없음');
        } else {
            res.setHeader('Content-Disposition', `attachment; filename="${uuid}"`);
            res.setHeader('Content-Type', 'application/octet-stream');
            res.send(data);
        }
    });
});

app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중`);
});
