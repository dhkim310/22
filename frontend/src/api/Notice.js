import axios from 'axios'

export const selectNoticeTop4Api = async (params) => {
    try {
      const response = await axios.get('/api/notice/first-list');
      return response.data;
    } catch (error) {
      throw error;
    }
};

