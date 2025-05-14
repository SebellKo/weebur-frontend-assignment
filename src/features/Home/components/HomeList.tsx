'use client';

import { ProductRes, ProductParams } from '@/types/api';
import { getProducts } from '@/features/Home/api/getProducts';
import useList from '@/hooks/useList';

import List from '@/components/commons/List/List';

interface Props {
  initialData: ProductRes;
  sort?: string;
}

/**
 * 홈 리스트 컴포넌트
 * @param initialData : 초기 데이터
 * @param sort : 정렬 기준
 */
function HomeList({ initialData, sort }: Props) {
  const params = { limit: 20, skip: 0, sort };
  // 리스트 데이터 요청
  const { products, fetchNextPage, hasNextPage, isFetching } =
    useList<ProductParams>({ initialData, fetchFn: getProducts, params });

  return (
    <List
      products={products}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
    />
  );
}

export default HomeList;
