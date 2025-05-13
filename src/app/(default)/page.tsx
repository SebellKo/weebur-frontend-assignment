import List from '@/features/Home/components/List/List';
import { getProducts } from '@/features/Home/api/getProducts';

export default async function Home() {
  const initialData = await getProducts({ limit: 20, skip: 0 });

  return <List initialData={initialData} />;
}
