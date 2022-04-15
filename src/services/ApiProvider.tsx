import React from 'react';

import axios from 'axios';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { toast } from 'react-toastify';

import { IResponse } from '@/services/types';

export const tokenKey = process.env.NEXT_PUBLIC_TOKEN_KEY ?? 'token_key';
export const host = process.env.NEXT_PUBLIC_API_URL ?? 'localhost:8080';

function getLocalToken() {
  return typeof window !== 'undefined' && window.localStorage.getItem(tokenKey)
    ? { Authorization: `Bearer ${window.localStorage.getItem(tokenKey)}` }
    : undefined;
}

export const Instance = axios.create({
  baseURL: host,
  httpAgent: '4rent-client',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    ...getLocalToken(),
  },
});

Instance.interceptors.response.use(
  (value) => value,
  (error) => {
    if (error.response) {
      const { error: msg } = error.response.data as IResponse<undefined>;
      if (msg) {
        toast.error(msg, { position: 'top-left' });
      }
    }
    return error;
  }
);

const client = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      const { error: message } = error as IResponse<undefined>;
      toast(message, { position: 'top-left' });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const { error: message } = error as IResponse<undefined>;
      toast(message, { position: 'top-left' });
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const Provider: React.FC = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

const Api = {
  Provider,
  Instance,
};

export default Api;
