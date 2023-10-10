import axios from "axios";

//달력 insert
export const insertEventApi = async (params) => {
    return new Promise ((resolve,reject) => {
      axios.post('/api/schedule', params)
      .then((res)=>{
        return resolve(res);
      })
      .catch((err)=>{
        return reject(err);
      })
    });
  }
//달력 select
export const selectEventApi = async (params) => {
    return new Promise ((resolve,reject) => {
      axios.get('/api/schedule', { params: params })
      .then((res)=>{
        return resolve(res);
      })
      .catch((err)=>{
        return reject(err);
      })
    });
  }