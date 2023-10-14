import axios from 'axios'

export const selectHrmListApi = async (params) => {
    try {
      const response = await axios.get('api/emp/hrm-list');
      return response.data;
    } catch (error) {
      throw error;
    }
};
export const insertEmpApi = async (params) => {
    return new Promise((resolve,reject)=> {
        axios.post('/api/sign-up', params)
        .then((res)=>{
            return resolve(res);
        })
        .catch((err)=>{
            return reject(err);
        })
    });
}