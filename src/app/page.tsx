import HomeContents from '@/features/Home/components/HomeContents';

export default function Home() {
  return (
    <>
      <main className='w-[900px] mx-auto flex flex-col justify-center items-center gap-[32px] '>
        <h1 className='text-4xl font-bold my-10'>Product List</h1>
        <HomeContents />
      </main>
    </>
  );
}
