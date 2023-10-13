import axios from 'axios'

export const SignUpApi = async (params) => {
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