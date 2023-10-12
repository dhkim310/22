import axios from 'axios'

export const selectInfo = async (params) => {
    try {
      const response = await axios.get('/api/emp/fix-info');
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const passwordUpdate = async (params) => {
  return new Promise((resolve, reject) => {
    axios
      .put('/api/emp/fix-info',params) // 두 번째 인수로 params 객체를 전달
      .then((res) => {
        return resolve(res);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

export const selectEmp = async (params) => {
    try {
      const response = await axios.get('/api/emp/main');
      return response.data;
    } catch (error) {
      throw error;
    }
};