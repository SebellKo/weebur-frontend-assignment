import List from '@/features/Home/components/List/List';
import SearchForm from '@/features/Home/components/Search/SearchForm';
import { Separator } from '@/components/ui/separator';

function HomeContents() {
  return (
    <div className='w-full flex flex-col gap-3'>
      {/* 검색 */}
      <SearchForm />
      <Separator />
      {/* product list */}
      <List />
    </div>
  );
}

export default HomeContents;
