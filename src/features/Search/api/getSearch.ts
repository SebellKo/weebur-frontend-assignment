import { SearchParams } from '@/features/Search/types/api';

export const getSearch = async ({ query, limit, skip, sort }: SearchParams) => {
  const queryString = sort
    ? `q=${query}&limit=${limit}&skip=${skip}&sortBy=${sort}&order=desc`
    : `q=${query}&limit=${limit}&skip=${skip}`;

  try {
    const response = await fetch(
      `https://dummyjson.com/products/search?${queryString}`
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
