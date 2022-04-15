import { useMutation } from 'react-query';

import { Api } from '@/services';
import { IResponse } from '@/services/types';

const useVerifyOtp = () => {
  return useMutation<IResponse<string>, IResponse<undefined>, number>(
    async (variables) => {
      const { data } = await Api.Instance.post('/account/verify', {
        otp: variables,
      });
      return data;
    }
  );
};

export default useVerifyOtp;
