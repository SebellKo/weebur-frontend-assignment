import SearchList from '@/features/Search/components/SearchList';
import { getSearch } from '@/features/Search/api/getSearch';

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ query: string; sort?: string }>;
}) {
  const { query, sort } = (await searchParams) || '';
  const initialData = await getSearch({ query, sort, limit: 20, skip: 0 });

  return <SearchList initialData={initialData} query={query} sort={sort} />;
}
