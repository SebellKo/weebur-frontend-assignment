'use client';

import { ProductRes } from '@/types/api';
import { SearchParams } from '@/features/Search/types/api';
import { getSearch } from '@/features/Search/api/getSearch';
import useList from '@/hooks/useList';

import List from '@/components/commons/List/List';

interface Props {
  initialData: ProductRes;
  query: string;
  sort?: string;
}

/**
 * 검색 리스트 컴포넌트
 * @param initialData : 초기 데이터
 * @param query : 검색 키워드
 * @param sort : 정렬 기준
 */
function SearchList({ initialData, query, sort }: Props) {
  const params = { query, sort, limit: 20, skip: 0 };
  // 검색 데이터 요청
  const { products, fetchNextPage, hasNextPage, isFetching, isEmpty } =
    useList<SearchParams>({ initialData, fetchFn: getSearch, params });

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
