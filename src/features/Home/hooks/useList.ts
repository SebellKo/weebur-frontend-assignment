import { getProducts } from '@/features/Home/api/getProducts';
import { ProductRes } from '@/types/api';
import { useInfiniteQuery } from '@tanstack/react-query';

const useList = (initialData: ProductRes) => {
  const {
    data: products,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
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

export default useList;
