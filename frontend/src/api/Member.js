import axios from "axios";

export const selectMemberList = async (params) => {
    try {
        const response = await axios.get('api/member/list');
        return response.data;
    }catch (error){
        throw error;
    }
};