import { getProducts } from '@/features/Home/api/getProducts';
import HomeList from '@/features/Home/components/HomeList';

export default async function Home() {
  const initialData = await getProducts({ limit: 20, skip: 0 });

  return <HomeList initialData={initialData} />;
}
