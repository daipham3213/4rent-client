import { useQuery } from 'react-query';

import { IUserInfo } from '@/services/authentication/authentication';
import { IResponse } from '@/services/types';
import { Api } from '@services';

const useAuth = () => {
  return useQuery<IResponse<IUserInfo>, IResponse<undefined>, IUserInfo>(
    'currentUser',
    {
      queryFn: async () => {
        const { data } = await Api.Instance.get('/account/');
        return data;
      },
    }
  );
};

export default useAuth;
