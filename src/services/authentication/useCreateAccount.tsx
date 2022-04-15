import { useMutation } from 'react-query';

import { Api } from '@/services';
import { IResponse } from '@/services/types';

import { ICreateAccount, IRegister } from './authentication';

const useCreateAccount = () => {
  return useMutation<
    IResponse<ICreateAccount & IRegister>,
    IResponse<unknown>,
    ICreateAccount
  >(async (variables) => {
    const { data } = await Api.Instance.post('/account/create', variables);
    return data;
  });
};

export default useCreateAccount;
