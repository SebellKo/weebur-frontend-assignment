import { getProducts } from '@/features/Home/api/getProducts';
import { ProductRes } from '@/features/Home/types/api';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

export const useList = (initialData: ProductRes) => {
  const {
    data: products,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam }) => getProducts({ limit: 20, skip: pageParam }),
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
