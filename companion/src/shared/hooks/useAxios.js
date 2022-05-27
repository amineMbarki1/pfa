import axios from 'axios';
import { useState } from 'react';

import API from '../API';

//IP FOR TESTING ON PHONE: http://192.168.1.67
//IP FOR TESTING ON EMULATOR: http://10.0.2.2
const BASE_URL = `${API}/api`;
const instance = axios.create({ baseURL: BASE_URL });

const useAxios = () => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (params) => {
    params.timeout = 2000;
    console.log(params);
    try {
      setLoading(true);
      const { data } = await instance.request(params);
      setResponse(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return { error, fetchData, loading, response, clearError };
};

export default useAxios;
