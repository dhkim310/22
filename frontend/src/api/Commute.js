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

export const commuteSelectApi = async (params) => {
    try {
        const response = await axios.get('/api/log/commute');

        if (response.data.logCheckOut.indexOf('1999') !== -1) {
            response.data.logCheckOut = 'T ';
            }
        if (response.data.logCheckIn.indexOf('1999') !== -1) {
            response.data.logCheckIn = 'T ';
        }
        response.data.logCheckIn = response.data.logCheckIn.split("T")[1];
        response.data.logCheckOut = response.data.logCheckOut.split("T")[1];
        return response.data;
    } catch (error) {
    throw error;
    }
};