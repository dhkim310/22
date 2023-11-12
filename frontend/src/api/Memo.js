import axios from 'axios'

export const selectMemoApi = async (params) => {
    try {
        const response = await axios.get('/api/memo');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const insertMemoApi = async (params) => {
    return new Promise((resolve,reject)=> {
        axios.put('/api/memo', params)
            .then((res)=>{
                return resolve(res);
            })
            .catch((err)=>{
                return reject(err);
            })
    });
}