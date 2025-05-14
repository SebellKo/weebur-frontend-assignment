import { getProducts } from '@/features/Home/api/getProducts';
import { ProductRes } from '@/types/api';
import { useInfiniteQuery } from '@tanstack/react-query';

const useList = (initialData: ProductRes, sort?: string) => {
  const {
    data: products,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', sort],
    queryFn: ({ pageParam }) =>
      getProducts({ limit: 20, skip: pageParam, sort }),
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

  return { products, fetchNextPage, hasNextPage, isFetching };
};

export default useList;
