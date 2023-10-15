import axios from "axios";

export const emp = async (params) => {
    try {
        const response = await axios.get('/api/emp');
        return response.data;
    } catch (error) {
        throw error;
    }
};
