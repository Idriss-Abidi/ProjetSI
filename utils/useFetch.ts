import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | AxiosError | null;
}

interface UseFetchResponse<T> extends UseFetchState<T> {
  refetch: () => Promise<void>;
}

function useFetch<T = any>(
  url: string,
  options?: AxiosRequestConfig
): UseFetchResponse<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true }));

    try {
      const response: AxiosResponse<T> = await axios(url, {
        ...options,
      });

      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error as Error | AxiosError,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]); // Re-fetch when URL changes

  return {
    ...state,
    refetch: fetchData,
  };
}

export default useFetch;