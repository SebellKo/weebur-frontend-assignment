import { ProductRes } from '@/types/api';
import { ProductParams } from '@/types/api';

export const getProducts = async ({
  limit,
  skip,
  sort,
}: ProductParams): Promise<ProductRes> => {
  try {
    const queryString = sort
      ? `limit=${limit}&skip=${skip}&sortBy=${sort}&order=desc`
      : `limit=${limit}&skip=${skip}`;
    console.log(queryString);
    const response = await fetch(
      `https://dummyjson.com/products?${queryString}`
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
