import axios from "axios";

export const fetchMovieList = async (page) => {
    try {
        const response = await axios.get(`/api/movie?page=${page}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};