import { ProductRes } from '@/types/api';
import { ProductParams } from '@/types/api';

/**
 * 상품 목록 조회
 * @param limit : 한번에 가져올 상품 수
 * @param skip : 건너뛸 상품 수
 * @param sort : 정렬 기준
 * @returns 상품 목록
 */
export const getProducts = async ({
  limit,
  skip,
  sort,
}: ProductParams): Promise<ProductRes> => {
  // 정렬 기준이 있는 경우에따른 쿼리 스트링 생성
  const queryString = sort
    ? `limit=${limit}&skip=${skip}&sortBy=${sort}&order=desc`
    : `limit=${limit}&skip=${skip}`;

  const response = await fetch(`https://dummyjson.com/products?${queryString}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
