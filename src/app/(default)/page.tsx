import { getProducts } from '@/features/Home/api/getProducts';
import HomeList from '@/features/Home/components/HomeList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Product List',
  description: 'Home | Product List',
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = (await searchParams) || '';
  const initialData = await getProducts({ limit: 20, skip: 0, sort });

  return <HomeList initialData={initialData} sort={sort} />;
}
