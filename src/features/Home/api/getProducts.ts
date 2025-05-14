import { ProductRes } from '@/types/api';
import { ProductParams } from '@/types/api';

export const getProducts = async ({
  limit,
  skip,
  sort,
}: ProductParams): Promise<ProductRes> => {
  const queryString = sort
    ? `limit=${limit}&skip=${skip}&sortBy=${sort}&order=desc`
    : `limit=${limit}&skip=${skip}`;

  const response = await fetch(`https://dummyjson.com/products?${queryString}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
