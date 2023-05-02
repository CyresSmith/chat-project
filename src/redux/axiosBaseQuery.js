import axios from 'axios';

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url = '', method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      console.log(result.data);
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
