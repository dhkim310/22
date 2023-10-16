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