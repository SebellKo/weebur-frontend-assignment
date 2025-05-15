import Image from 'next/image';
import { useCallback, useState } from 'react';

import { Product } from '@/types/api';

interface Props {
  product: Product;
}

/**
 * 그리드 아이템
 * - 1줄에 4개의 상품정보 레이아웃 전용 아이템 컴포넌트
 * @param product : 상품 정보
 */
function GridItem({ product }: Props) {
  // 제목 하이라이트를 위한 mouse over 상태
  const [isOver, setIsOver] = useState(false);
  const { title, description, thumbnail, rating, reviews } = product;

  const handleOverItem = useCallback(() => {
    setIsOver(true);
  }, []);

  const handleLeaveItem = useCallback(() => {
    setIsOver(false);
  }, []);

  return (
    <li
      className='flex flex-col gap-3 pb-3 cursor-pointer'
      onMouseOver={handleOverItem}
      onMouseLeave={handleLeaveItem}
    >
      <Image
        src={thumbnail}
        alt='product'
        className='rounded-md'
        width={200}
        height={200}
      />
      <div className='flex flex-col gap-2'>
        <h3 className={`text-lg font-bold ${isOver ? 'underline' : ''}`}>
          {title}
        </h3>
        <div className='flex gap-2'>
          <p className='text-sm font-bold text-orange-500'>{`${rating} / 5.0`}</p>
          <p className='text-sm text-gray-600'>{`(${reviews.length})`}</p>
        </div>
        <p className='text-sm text-gray-500'>{description}</p>
      </div>
    </li>
  );
}

export default GridItem;
