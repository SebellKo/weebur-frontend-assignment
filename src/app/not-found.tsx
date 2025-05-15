'use client';

import { useRouter } from 'next/navigation';

/**
 * 404 페이지
 */
export default function NotFound() {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-4xl font-bold'>404</h1>
      <p className='mt-2'>페이지를 찾을 수 없습니다.</p>
      <button
        onClick={() => router.push('/')}
        className='mt-4 text-blue-500 hover:underline'
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
