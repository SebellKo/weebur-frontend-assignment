import SearchForm from '@/components/commons/Search/SearchForm';
import { Separator } from '@/components/ui/separator';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='w-[900px] mx-auto flex flex-col justify-center items-center gap-[32px] '>
      <h1 className='text-4xl font-bold my-10'>Product List</h1>
      <div className='w-full flex flex-col gap-3'>
        {/* 검색 */}
        <SearchForm />
        <Separator />
        {children}
      </div>
    </main>
  );
}
