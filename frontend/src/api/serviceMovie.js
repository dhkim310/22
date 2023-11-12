import axios from "axios";

export const fetchServiceMovieList = async (page) => {
    try {
        const response = await axios.get(`/api/serviceMovie?page=${page}`);
        return response.data;
    } catch (error) {
        alert("권한이 없습니다."); // 에러 메시지를 보여줌
        window.location.href = '/main'; // 메인 페이지로 이동
    }
};

export const insertServiceMovieApi = async (id,params) => {
    return new Promise((resolve,reject)=>{
        axios.post(`/api/serviceMovie/${id}`,params)
            .then((res)=>{
                return resolve(res);
            })
            .catch((err)=>{
                return reject(err);
            })
    });
}

export const updateServiceMovieApi = async (id,params) => {
    return new Promise((resolve,reject)=>{
        axios.put(`/api/serviceMovie/${id}`,params)
            .then((res)=>{
                return resolve(res);
            })
            .catch((err)=>{
                return reject(err);
            })
    });
}

export const serviceMovieDetailApi = async (id) => {
    try {
        const response = await axios.get(`/api/serviceMovie/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};