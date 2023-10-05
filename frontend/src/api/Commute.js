import axios from 'axios'

export const commuteApi = async (params) => {
    return new Promise((resolve,reject)=> {
        axios.post('/api/log/commute', params)
        .then((res)=>{
            return resolve(res);
        })
        .catch((err)=>{
            return reject(err);
        })
    });
}

export const commuteUpdateApi = async (params) => {
    return new Promise((resolve,reject)=> {
        axios.put('/api/log/commute', params)
        .then((res)=>{
            return resolve(res);
        })
        .catch((err)=>{
            return reject(err);
        })
    });
}