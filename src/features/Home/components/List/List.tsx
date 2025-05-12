'use client';

import FlexItem from '@/features/Home/components/List/FlexItem';
import GridItem from '@/features/Home/components/List/GridItem';
import { useLayout } from '@/hooks/useLayout';

function List() {
  const { layout } = useLayout();

  return (
    <ul
      className={`${
        layout === 'flex'
          ? 'flex flex-col gap-3 p-3'
          : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3'
      }`}
    >
      {layout === 'flex' ? <FlexItem /> : <GridItem />}
    </ul>
  );
}

export default List;
