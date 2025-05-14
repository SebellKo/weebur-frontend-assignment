'use client';

import List from '@/components/commons/List/List';
import { ProductRes } from '@/types/api';
import useList from '@/hooks/useList';
import { getSearch } from '@/features/Search/api/getSearch';
import { SearchParams } from '@/features/Search/types/api';
interface Props {
  initialData: ProductRes;
  query: string;
  sort?: string;
}

function SearchList({ initialData, query, sort }: Props) {
  const params = { query, sort, limit: 20, skip: 0 };
  const { products, fetchNextPage, hasNextPage, isFetching, isEmpty } =
    useList<SearchParams>({ initialData, fetchFn: getSearch, params });
  console.log(initialData);
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
