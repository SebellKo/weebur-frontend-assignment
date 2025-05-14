import { ProductParams } from '@/types/api';

export interface SearchParams extends ProductParams {
  query: string;
}
