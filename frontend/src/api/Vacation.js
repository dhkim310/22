import axios from "axios";

export const vacationDetail = async (id) => {
    try {
        const response = await axios.get(`/api/vacation/${id}`);
        return response.data;
    }catch (error){
        throw error;
    }
}
export const vacationUpdate = async (params) => {
    try{
        const response = await axios.put('/api/vacation', params);
        return response;
    }catch (error){
        throw error;
    }
}