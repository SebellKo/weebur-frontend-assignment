import { ProductRes } from '@/types/api';

interface Props {
  limit: number;
  skip: number;
}

export const getProducts = async ({
  limit,
  skip,
}: Props): Promise<ProductRes> => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
