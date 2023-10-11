import axios from 'axios'

export const selectMemoApi = async (params) => {
    try {
      const response = await axios.get('/api/memo');
      return response.data;
    } catch (error) {
      throw error;
    }
};

