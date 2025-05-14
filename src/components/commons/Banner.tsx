'use client';

import { useRouter } from 'next/navigation';

/**
 * 배너 컴포넌트
 */
function Banner() {
  const router = useRouter();

  // 배너 클릭시 홈화면 이동
  const handleClickBanner = () => {
    router.push('/');
  };

  return (
    <h1
      className='text-4xl font-bold my-10 cursor-pointer'
      onClick={handleClickBanner}
    >
      Product List
    </h1>
  );
}

export default Banner;
