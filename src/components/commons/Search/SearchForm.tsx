'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/**
 * 리스트 상단 검색 폼
 */
function SearchForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const params = useSearchParams();
  const query = params.get('query');
  const sort = params.get('sort');
  // 정렬 기준 선택 값
  const selectValue = sort ?? 'default';
  const pathname = usePathname();

  useEffect(() => {
    // 홈 페이지에서 검색 인풋 value 초기화
    if (pathname === '/' && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [pathname]);

  /**
   * 검색 폼 제출 이벤트
   * @param e : 이벤트 객체
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = inputRef.current?.value;
    router.push(`/search?query=${searchValue}`);
  };

  /**
   * 정렬 기준 선택 이벤트
   * @param value : 선택 값
   */
  const handleSort = (value: string) => {
    // 홈 페이지 && 정렬 기준이 별점순인 경우
    if (!query && value === 'rating') return router.push(`/?sort=rating`);
    // 홈 페이지 && 정렬 기준이 기본인 경우
    if (!query && value === 'default') return router.push(`/`);
    // 검색 페이지 && 정렬 기준이 기본인 경우
    if (value === 'default') return router.push(`/search?query=${query}`);
    // 검색 페이지 && 정렬 기준이 별점순인 경우
    router.push(`/search?query=${query}&sort=rating`);
  };

  return (
    <form className='flex justify-between' onSubmit={handleSubmit}>
      {/* 정렬 컴포넌트 */}
      <Select onValueChange={handleSort} value={selectValue}>
        <SelectTrigger>
          <SelectValue placeholder='정렬' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='default'>전체</SelectItem>
          <SelectItem value='rating'>별점순</SelectItem>
        </SelectContent>
      </Select>
      {/* 검색 인풋 컴포넌트 */}
      <div className='flex gap-2'>
        <Input
          ref={inputRef}
          className='w-[300px]'
          placeholder='검색어를 입력해주세요.'
        />
        <Button type='submit'>검색</Button>
      </div>
    </form>
  );
}

export default SearchForm;
