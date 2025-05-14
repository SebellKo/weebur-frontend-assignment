import SearchList from '@/features/Search/components/SearchList';
import { getSearch } from '@/features/Search/api/getSearch';

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = (await searchParams) || '';
  const initialData = await getSearch(query);

  return <SearchList initialData={initialData} query={query} />;
}
