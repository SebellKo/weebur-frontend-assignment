import List from '@/features/Home/components/List/List';
import SearchForm from '@/features/Home/components/Search/SearchForm';
import { Separator } from '@/components/ui/separator';
import { getProducts } from '@/features/Home/api/getProducts';

export default async function HomeContents() {
  const initialData = await getProducts({ limit: 20, skip: 0 });

  return (
    <div className='w-full flex flex-col gap-3'>
      {/* 검색 */}
      <SearchForm />
      <Separator />
      {/* product list */}
      <List initialData={initialData} />
    </div>
  );
}
