import axios from "axios";

export const selectMessageListApi = async (params) => {
    try{
        const response = await axios.get('/api/message');
        return response.data;
    } catch (error){
        throw error;
    }
};
export const selectHrmListApi = async (params) => {
    try {
      const response = await axios.get('api/emp/hrm-list');
      return response.data;
    } catch (error) {
      throw error;
    }
};
export const insertMessageApi = async (params) => {
    return new Promise((resolve,reject)=> {
        axios.post('/api/message', params)
        .then((res)=>{
            return resolve(res);
        })
        .catch((err)=>{
            return reject(err);
        })
    });
}