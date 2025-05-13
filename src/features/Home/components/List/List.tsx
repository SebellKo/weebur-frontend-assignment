'use client';

import FlexItem from '@/features/Home/components/List/FlexItem';
import GridItem from '@/features/Home/components/List/GridItem';
import { ProductRes } from '@/features/Home/types/api';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from '@/features/Home/api/getProducts';
import { useLayout } from '@/hooks/useLayout';

interface Props {
  initialData: ProductRes;
}

function List({ initialData }: Props) {
  const { layout } = useLayout();

  const { data } = useSuspenseInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam }) => getProducts({ limit: 20, skip: pageParam }),
    initialPageParam: 1,
    initialData: {
      pages: [initialData],
      pageParams: [0],
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.skip + lastPage.limit;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.products);
    },
  });

  return (
    <ul
      className={`${
        layout === 'flex'
          ? 'flex flex-col gap-3 p-3'
          : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3'
      }`}
    >
      {data.map((product) => {
        return layout === 'flex' ? (
          <FlexItem key={product.id} product={product} />
        ) : (
          <GridItem key={product.id} product={product} />
        );
      })}
    </ul>
  );
}

export default List;
