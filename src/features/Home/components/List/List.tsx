'use client';

import FlexItem from '@/features/Home/components/List/FlexItem';
import GridItem from '@/features/Home/components/List/GridItem';
import { ProductRes } from '@/features/Home/types/api';
import { useLayout } from '@/hooks/useLayout';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useList } from '@/features/Home/hooks/useList';

interface Props {
  initialData: ProductRes;
}

function List({ initialData }: Props) {
  const { layout } = useLayout();
  const { products, fetchNextPage, hasNextPage } = useList(initialData);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <ul
      className={`${
        layout === 'flex'
          ? 'flex flex-col gap-3 p-3'
          : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3'
      }`}
    >
      {products.map((product) => {
        return layout === 'flex' ? (
          <FlexItem key={product.id} product={product} />
        ) : (
          <GridItem key={product.id} product={product} />
        );
      })}
      <div ref={ref} />
    </ul>
  );
}

export default List;
