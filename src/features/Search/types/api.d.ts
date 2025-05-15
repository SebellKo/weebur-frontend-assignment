import { ProductParams } from '@/types/api';

/**
 * 검색요청 파라미터
 */
export interface SearchParams extends ProductParams {
  query: string;
}
