import axios from "axios";

export const fetchMovieList = async (page) => {
    try {
        const response = await axios.get(`/api/movie?page=${page}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const insertMovieApi = async () => {
    return new Promise((resolve,reject)=> {
        axios.get('/api/movie/getInfo')
        .then((res)=>{
            return resolve(res);
        })
        .catch((err)=>{
            return reject(err);
        })
    });
};