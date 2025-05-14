import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/types/api';

interface Props {
  product: Product;
}

function FlexItem({ product }: Props) {
  const { title, description, thumbnail, rating, reviews } = product;
  return (
    <>
      <li className='flex gap-5 cursor-pointer'>
        <Image src={thumbnail} alt='product' width={150} height={150} />
        <div className='flex flex-col gap-2'>
          <h3 className='text-lg font-bold hover:underline'>{title}</h3>
          <div className='flex gap-2'>
            <p className='text-sm font-bold text-orange-500'>{`${rating} / 5.0`}</p>
            <p className='text-sm text-gray-600'>{`(${reviews.length})`}</p>
          </div>
          <p className='text-sm text-gray-500'>{description}</p>
        </div>
      </li>
      <Separator />
    </>
  );
}

export default FlexItem;
