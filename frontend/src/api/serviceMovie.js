import axios from "axios";

export const fetchServiceMovieList = async (page) => {
    try {
        const response = await axios.get(`/api/serviceMovie?page=${page}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};