import axios from 'axios'

export const selectHrmListApi = async (params) => {
    try {
        const response = await axios.get('/api/emp/hrm-list');
        return response.data;
    } catch (error) {
        window.location.href('/main')
        alert("권한이 없습니다")
    }
};

export const selectHrmDetailApi = async (id) => {
    try {
        const response = await axios.get(`/api/emp/hrm/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const insertEmpApi = async (params) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/sign-up', params)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            })
    });
}


export const updateHrmApi = async (id, params) => {
    return new Promise((resolve, reject) => {
        axios.put(`/api/emp/hrm/${id}`, params)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            })
    });
}

export const selectEmpList = async () => {
    try {
        const response = await axios.get('/api/emp/salary-list');
        return response.data;
    } catch (error) {
        throw error;
    }
};