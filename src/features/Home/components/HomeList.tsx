'use client';

import List from '@/components/commons/List/List';
import { ProductRes } from '@/features/Home/types/api';
import useList from '@/features/Home/hooks/useList';

interface Props {
  initialData: ProductRes;
}

function HomeList({ initialData }: Props) {
  const { products, fetchNextPage, hasNextPage, isFetching } =
    useList(initialData);

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
