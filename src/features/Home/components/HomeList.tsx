'use client';

import { ProductRes, ProductParams } from '@/types/api';
import { getProducts } from '@/features/Home/api/getProducts';
import useList from '@/hooks/useList';

import List from '@/components/commons/List/List';

interface Props {
  initialData: ProductRes;
  sort?: string;
}

function HomeList({ initialData, sort }: Props) {
  const params = { limit: 20, skip: 0, sort };
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
