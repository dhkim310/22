import axios from "axios";

export const fetchMovieList = async (page) => {
    try {
        const response = await axios.get(`/api/movie?page=${page}`);
        return response.data;
    } catch (error) {
        alert("권한이 없습니다."); // 에러 메시지를 보여줌
        window.location.href = '/main'; // 메인 페이지로 이동
    }
};

export const insertMovieApi = async () => {
    return new Promise((resolve, reject) => {
        axios.get('/api/movie/getInfo')
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            })
    });
};

export const serviceMovieInsert = async (id, params) => {
    try {
        const response = await axios.post(`/api/serviceMovie/${id}`, params);
        return response;
    } catch (error) {
        throw error;
    }
};

export const fetchMovieDetail = async (id) => {
    try {
        const response = await axios.get(`/api/movie/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};