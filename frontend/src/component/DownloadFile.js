import React from 'react';
import axios from 'axios';

const DownloadFile = ({ file }) => {
    const handleDownload = () => {
        axios({
            url: `/api/file/${file.uuid}`,
            method: 'GET',
            responseType: 'blob',
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file.name);
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.log(file.uuid)
                console.error('파일 다운로드 오류:', error);
            });
    };

    return (
        <a href="#" onClick={handleDownload}>
            다운로드
        </a>
    );
};

export default DownloadFile;
