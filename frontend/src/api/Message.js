import axios from "axios";

export const selectMessageListApi = async (params) => {
    return new Promise((resolve, reject) => {
        axios.get('/api/message', {params: params})
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            })
    });
}