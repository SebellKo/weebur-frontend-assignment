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
function SearchForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = inputRef.current?.value;
  };

  const handleSort = (value: string) => {
    console.log(value);
  };

  return (
    <form className='flex justify-between' onSubmit={handleSubmit}>
      {/* sort */}
      <Select onValueChange={handleSort}>
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
