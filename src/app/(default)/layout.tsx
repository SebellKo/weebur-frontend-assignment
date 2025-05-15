import SearchForm from '@/components/commons/Search/SearchForm';
import { Separator } from '@/components/ui/separator';
import Banner from '@/components/commons/Banner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='w-[900px] mx-auto flex flex-col justify-center items-center gap-[32px] '>
      <Banner />
      <div className='w-full flex flex-col gap-3'>
        {/* 검색 */}
        <SearchForm />
        <Separator />
        {children}
      </div>
    </main>
  );
}
