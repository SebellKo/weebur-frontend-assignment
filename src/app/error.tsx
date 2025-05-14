'use client';

import { useRouter } from 'next/navigation';

export default function Error() {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-4xl font-bold'>Internal Server Error</h1>
      <p className='mt-2'>죄송합니다 잠시후 다시 시도해 주세요.</p>
      <button
        onClick={() => router.push('/')}
        className='mt-4 text-blue-500 hover:underline'
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
