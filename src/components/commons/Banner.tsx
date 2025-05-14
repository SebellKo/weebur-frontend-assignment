'use client';

import { useRouter } from 'next/navigation';

function Banner() {
  const router = useRouter();
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
