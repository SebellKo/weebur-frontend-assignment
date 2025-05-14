'use client';

import List from '@/components/commons/List/List';
import useSearchList from '@/features/Search/hooks/useSearchList';
import { ProductRes } from '@/types/api';
interface Props {
  initialData: ProductRes;
  query: string;
}

function SearchList({ initialData, query }: Props) {
  const { products, fetchNextPage, hasNextPage, isFetching, isEmpty } =
    useSearchList(initialData, query);

  return (
    <List
      products={products}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      isEmpty={isEmpty}
    />
  );
}

export default SearchList;
