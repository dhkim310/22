import axios from 'axios'

export const selectNoticeTop4Api = async (params) => {
    try {
        const response = await axios.get('/api/notice/first-list');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 공지사항 리스트를 가져오는 함수
export const fetchNoticeList = async (page) => {
    try {
        const response = await axios.get(`/api/notice?page=${page}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createNotice = async (formData) => {
    try {
        const response = await axios.post('/api/notice', formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};