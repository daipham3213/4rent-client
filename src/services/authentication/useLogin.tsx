import { useMutation } from 'react-query';

import { Api } from '@/services';

import { IResponse } from '../types';
import { ILogin, IToken } from './authentication';

const useLogin = () => {
  return useMutation<IResponse<IToken>, IResponse<undefined>, ILogin>(
    async (variables) => {
      const { data } = await Api.Instance.post('/account/login', variables);
      return data;
    }
  );
};

export default useLogin;
