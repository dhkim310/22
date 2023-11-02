import axios from "axios";

export const vacationUpdate = async (params) => {
    try{
        const response = await axios.put('api/vacation', params);
        return response;
    }catch (error){
        throw error;
    }
}