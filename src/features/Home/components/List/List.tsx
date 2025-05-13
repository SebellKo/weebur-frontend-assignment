'use client';

import FlexItem from '@/features/Home/components/List/FlexItem';
import GridItem from '@/features/Home/components/List/GridItem';
import { ProductRes } from '@/features/Home/types/api';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { useList } from '@/features/Home/hooks/useList';
import { Layout } from '@/features/Home/types/layout';

interface Props {
  initialData: ProductRes;
}

function List({ initialData }: Props) {
  const [currentLayout, setCurrentLayout] = useState<Layout | null>(null);
  const { products, fetchNextPage, hasNextPage } = useList(initialData);
  const { ref, inView } = useInView();

  useEffect(() => {
    const { layout, timestamp } = JSON.parse(
      localStorage.getItem('layout') || '{}'
    );

    if (!layout || timestamp < Date.now() - 1000 * 60 * 60 * 24) {
      const newLayout = Math.random() < 0.5 ? 'flex' : 'grid';
      localStorage.setItem(
        'layout',
        JSON.stringify({ layout: newLayout, timestamp: Date.now() })
      );
      setCurrentLayout(newLayout);
    } else {
      setCurrentLayout(layout);
    }
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (!currentLayout) return <></>;

  return (
    <ul
      className={`${
        currentLayout === 'flex'
          ? 'flex flex-col gap-3 p-3'
          : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3'
      }`}
    >
      {products.map((product) => {
        return currentLayout === 'flex' ? (
          <FlexItem key={product.id} product={product} />
        ) : (
          <GridItem key={product.id} product={product} />
        );
      })}
      <div ref={ref} />
      {!hasNextPage && (
        <div className='flex justify-center items-center h-10'>
          <p className='text-sm text-gray-500'>더 이상 불러올 수 없습니다.</p>
        </div>
      )}
    </ul>
  );
}

export default List;
