import axios from "axios";

export const vacationDetail = async (id) => {
    try {
        const response = await axios.get(`/api/vacation/${id}`);
        return response.data;
    }catch (error){
        throw error;
    }
}
export const vacationInsert = async (params) => {
    try {
        const response = await axios.post('/api/vacation', params);
        return response;
    }catch (error){
        throw error;
    }
}
export const SelectUsedVacationListApi = async (page) => {
    try {
        const response = await axios.get('/api/vacation');
        return response.data;
    } catch (error) {
        throw error;
    }
};