import { SearchParams } from '@/features/Search/types/api';

/**
 * 검색 데이터 조회
 * @param query : 검색 키워드
 * @param limit : 한번에 가져올 상품 수
 * @param skip : 건너뛸 상품 수
 * @param sort : 정렬 기준
 */
export const getSearch = async ({ query, limit, skip, sort }: SearchParams) => {
  // 정렬 기준이 있는 경우에따른 쿼리 스트링 생성
  const queryString = sort
    ? `q=${query}&limit=${limit}&skip=${skip}&sortBy=${sort}&order=desc`
    : `q=${query}&limit=${limit}&skip=${skip}`;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/search?${queryString}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
