import axios from "axios";

export const selectSalaryList = async (id) => {
    try {
        const response = await axios.get(`/api/salary/list/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const salaryInsert = async (params) => {
    try {
        const response = await axios.post('/api/salary', params);
        return response;
    } catch (error) {
        throw error; // 또는 오류를 처리하거나 다시 던집니다.
    }
};

export const salaryDelete = async (id) => {
    return axios.delete(`/api/salary/list/${id}`);
};
