import axios from "axios";

export const fetchServiceMovieList = async (page) => {
    try {
        const response = await axios.get(`/api/serviceMovie?page=${page}`);
        return response.data;
    } catch (error) {
        throw error;
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