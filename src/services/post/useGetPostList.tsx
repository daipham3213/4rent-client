import { useInfiniteQuery } from 'react-query';

import { IPostFilter, IPostView } from '@/services/post/post';
import { IResponse, IPageable } from '@/services/types';
import { Api } from '@services';

const useGetPostList = (filter?: IPostFilter) => {
  return useInfiniteQuery<
    IResponse<IPageable<IPostView>>,
    IResponse<IPageable<undefined>>
  >(
    ['posts', filter],
    async ({ pageParam = 0 }) => {
      const response = await Api.Instance.get(
        `/post?page=${pageParam}&size=5`,
        {
          params: filter,
        }
      );
      if (response.status === 200) {
        return response.data;
      }
      return response;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data) {
          const { pageable } = lastPage.data;
          return pageable.pageNumber + 1;
        }
        return undefined;
      },
    }
  );
};

export default useGetPostList;
