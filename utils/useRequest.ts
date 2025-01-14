import { useState, useCallback } from 'react';
import axios, { 
  AxiosError, 
  AxiosRequestConfig, 
  AxiosResponse, 
  Method 
} from 'axios';

interface RequestState<T> {
  data: T | null;
  loading: boolean;
  error: Error | AxiosError | null;
}

interface RequestOptions extends AxiosRequestConfig {
  onSuccess?: (data: any) => void;
  onError?: (error: Error | AxiosError) => void;
}

export function useRequest<T = any, D = any>() {
  const [state, setState] = useState<RequestState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (
    url: string,
    {
      method = 'GET',
      data,
      onSuccess,
      onError,
      ...config
    }: RequestOptions = {}
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response: AxiosResponse<T> = await axios({
        url,
        method: method as Method,
        data,
        ...config,
      });

      setState({
        data: response.data,
        loading: false,
        error: null,
      });

      onSuccess?.(response.data);
      return response.data;
    } catch (error) {
      const errorObj = error as Error | AxiosError;
      setState({
        data: null,
        loading: false,
        error: errorObj,
      });

      onError?.(errorObj);
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    execute,
  };
}

export default useRequest;