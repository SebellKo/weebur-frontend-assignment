import Image from 'next/image';
import { useState } from 'react';

import { Product } from '@/types/api';

interface Props {
  product: Product;
}

function GridItem({ product }: Props) {
  const [isOver, setIsOver] = useState(false);
  const { title, description, thumbnail, rating, reviews } = product;

  const handleOverItem = () => {
    setIsOver(true);
  };

  const handleLeaveItem = () => {
    setIsOver(false);
  };

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
