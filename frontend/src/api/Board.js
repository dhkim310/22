import axios from "axios";

// 게시판 리스트를 가져오는 함수
export const fetchBoardList = async (page) => {
    try {
        const response = await axios.get(`/api/board?page=${page}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const boardInsert = async (formData) => {
    try {
        const response = await axios.post('/api/board', formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchBoardDetail = async (id) => {
    try {
        const response = await axios.get(`/api/board/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const commentDelete = async (commentId) => {
    return fetch(`/api/comment/${commentId}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (response.status === 200) {
                return Promise.resolve(); // 삭제 성공 시 Promise를 성공 상태로 반환
            } else {
                return Promise.reject("삭제 권한 없음"); // 삭제 실패 시 Promise를 실패 상태로 반환
            }
        })
        .catch((error) => {
            return Promise.reject(error); // 오류가 발생한 경우 Promise를 실패 상태로 반환
        });
};

export const postComment = (id, commentText) => {
    return fetch(`/api/comment/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({comment: commentText}),
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json()
                    .then((data) => {
                        const writer = data.writer;
                        const commentId = data.commentId; // 수정
                        return {writer, commentId};
                    });
            } else {
                return Promise.reject('댓글 등록 실패');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            return Promise.reject('댓글 등록 중 오류 발생');
        });
};

export const getFile = async (file) => {
    try {
        const response = await fetch(`/api/file/${file.uuid}`, {
            method: 'GET',
        });

        if (response.status === 200) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name; // 다운로드될 파일 이름 설정
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            return Promise.resolve(); // 다운로드 성공 시 Promise를 성공 상태로 반환
        } else {
            return Promise.reject("파일 다운로드 실패"); // 다운로드 실패 시 Promise를 실패 상태로 반환
        }
    } catch (error) {
        return Promise.reject(error); // 오류가 발생한 경우 Promise를 실패 상태로 반환
    }
};