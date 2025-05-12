import FlexItem from '@/features/Home/components/List/FlexItem';
import GridItem from '@/features/Home/components/List/GridItem';

function List() {
  return (
    <ul className='flex flex-col gap-3 p-3'>
      {/* <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3'> */}
      <FlexItem />
      <GridItem />
    </ul>
  );
}

export default List;
