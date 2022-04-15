import { useMutation } from 'react-query';

import { Api } from '@/services';
import { IRegister } from '@/services/authentication/authentication';
import { IResponse } from '@/services/types';

const useRegister = () => {
  return useMutation<IResponse<string>, IResponse<undefined>, IRegister>(
    async (variables) => {
      const { data } = await Api.Instance.post('/account/register', variables);
      return data;
    }
  );
};

export default useRegister;
