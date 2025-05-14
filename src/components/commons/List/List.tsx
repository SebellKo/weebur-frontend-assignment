'use client';

import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

import { Product } from '@/types/api';
import { Layout } from '@/types/layout';

import FlexItem from '@/components/commons/List/FlexItem';
import GridItem from '@/components/commons/List/GridItem';
import Spinner from '@/components/ui/spinner';

interface Props {
  products: Product[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetching: boolean;
  isEmpty?: boolean;
}

function List({
  products,
  hasNextPage,
  fetchNextPage,
  isFetching,
  isEmpty,
}: Props) {
  const [currentLayout, setCurrentLayout] = useState<Layout | null>(null);
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

  if (!currentLayout)
    return (
      <div className='flex justify-center items-center mt-10'>
        <Spinner />
      </div>
    );

  return (
    <>
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
      </ul>
      {!isEmpty && !hasNextPage && (
        <div className='flex justify-center items-center h-10'>
          <p className='text-sm text-gray-500'>더 이상 불러올 수 없습니다.</p>
        </div>
      )}
      {isFetching && (
        <div className='flex justify-center items-center h-10'>
          <Spinner />
        </div>
      )}
      {isEmpty && (
        <div className='flex justify-center items-center h-10'>
          <p className='text-sm text-gray-500'>일치하는 결과가 없습니다.</p>
        </div>
      )}
    </>
  );
}

export default List;
