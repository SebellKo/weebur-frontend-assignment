'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function SearchForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const params = useSearchParams();
  const query = params.get('query');
  const sort = params.get('sort');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = inputRef.current?.value;
    router.push(`/search?query=${searchValue}`);
  };

  const handleSort = (value: string) => {
    if (!query && value === 'rating') return router.push(`/?sort=rating`);
    if (!query && value === 'default') return router.push(`/`);
    if (value === 'default') return router.push(`/search?query=${query}`);
    router.push(`/search?query=${query}&sort=rating`);
  };

  return (
    <form className='flex justify-between' onSubmit={handleSubmit}>
      {/* sort */}
      <Select onValueChange={handleSort} defaultValue={sort ?? 'default'}>
        <SelectTrigger>
          <SelectValue placeholder='정렬' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='default'>전체</SelectItem>
          <SelectItem value='rating'>별점순</SelectItem>
        </SelectContent>
      </Select>
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
