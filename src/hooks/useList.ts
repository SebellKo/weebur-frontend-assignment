import { useInfiniteQuery } from '@tanstack/react-query';

import { ProductRes } from '@/types/api';

interface Props<T> {
  initialData: ProductRes;
  fetchFn: (params: T) => Promise<ProductRes>;
  params: T;
}

const useList = <T>({ initialData, fetchFn, params }: Props<T>) => {
  const {
    data: products,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', params],
    queryFn: ({ pageParam }) => {
      const fetchParams = {
        ...params,
        skip: pageParam,
      } as T;
      return fetchFn(fetchParams);
    },
    initialPageParam: 0,
    initialData: {
      pages: [initialData],
      pageParams: [0],
    },
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.skip + lastPage.limit;
      return nextOffset < lastPage.total ? nextOffset : undefined;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.products);
    },
  });

  const isEmpty = products?.length === 0;

  return { products, fetchNextPage, hasNextPage, isFetching, isEmpty };
};

export default useList;
