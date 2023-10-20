import axios from "axios";

export const selectMemberList = async (params) => {
    try {
        const response = await axios.get('/api/member/list');
        return response.data;
    }catch (error){
        throw error;
    }
};

export const selectMemberDetail = async (id) => {
    try {
        const response = await axios.get(`/api/member/detail/${id}`);
        return response.data;
    }catch (error){
        throw error;
    }
}