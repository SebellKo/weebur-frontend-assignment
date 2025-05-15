import { useInfiniteQuery } from '@tanstack/react-query';

import { ProductRes } from '@/types/api';

interface Props<T> {
  initialData: ProductRes;
  fetchFn: (params: T) => Promise<ProductRes>;
  params: T;
}

/**
 * 리스트 데이터 요청 훅
 * @param initialData : 초기 데이터
 * @param fetchFn : 데이터 요청 함수
 * @param params : 요청 파라미터
 * @returns 리스트 데이터
 */
const useList = <T>({ initialData, fetchFn, params }: Props<T>) => {
  const {
    data: products,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', params],
    queryFn: ({ pageParam }) => {
      // 제네릭 타입에 따른 파라미터 추가
      const fetchParams = {
        ...params,
        skip: pageParam,
      } as T;
      // 데이터 요청
      return fetchFn(fetchParams);
    },
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 5,
    initialPageParam: 0,
    // 초기 데이터 설정
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
