import { getSearch } from '@/features/Search/api/getSearch';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ProductRes } from '@/types/api';

const useSearchList = (initialData: ProductRes, query: string) => {
  const {
    data: products,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['search', query],
    queryFn: () => getSearch(query),
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

export default useSearchList;
