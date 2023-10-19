// DownloadFile.js

import React from 'react';
import {getFile} from '../api/Board'; // getFile 함수를 가져옵니다.

const DownloadFile = ({file}) => {
    const handleDownload = () => {
        getFile(file.uuid) // 이 함수는 API에서 파일 다운로드 링크를 가져오는 함수로 가정합니다.
            .then((response) => {
                // 파일 다운로드를 시작하거나 다운로드 링크를 열 수 있음
                window.open(response.url, '_blank');
            })
            .catch((error) => {
                // 오류 처리
                console.error('파일 다운로드 오류:', error);
            });
    };

    return (
        <a
            href={`/api/file/${file.uuid}`} // 파일 다운로드 URL을 정확하게 생성
            target="_blank"
            download={file.name}
            onClick={handleDownload} // 다운로드 클릭 시 handleDownload 함수 호출
        >
            다운로드
        </a>
    );
};

export default DownloadFile;
