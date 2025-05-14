'use client';

import List from '@/components/commons/List/List';
import { ProductRes } from '@/types/api';
import useList from '@/features/Home/hooks/useList';

interface Props {
  initialData: ProductRes;
  sort?: string;
}

function HomeList({ initialData, sort }: Props) {
  const { products, fetchNextPage, hasNextPage, isFetching } = useList(
    initialData,
    sort
  );

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
