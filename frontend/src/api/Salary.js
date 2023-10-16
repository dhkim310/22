import axios from "axios";

export const salaryList = async (params) => {
    try {
        const response = await axios.get(`api/salary/${id}`);
        return response.data;
    } catch (error){
        throw error;
    }
}

export const insertSalary = async (data) => {
    try {
        const response = await axios.post('/api/salary', data
        )
        return response.data;
    }catch (error){
        throw error;
    }
}