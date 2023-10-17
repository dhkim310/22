import axios from 'axios'

export const loginApi = async (params) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/sign-in', params)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            })
    });
}