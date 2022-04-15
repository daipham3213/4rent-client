import { useMutation } from 'react-query';

import { Api } from '@services';

import { IResponse } from '../types';
import { IPostCreate } from './post';

const useAddPost = () => {
  return useMutation<IResponse<string>, IResponse<undefined>, IPostCreate>(
    async (variables) => {
      const { data } = await Api.Instance.post('/post/create', variables);
      return data;
    }
  );
};

export default useAddPost;
