import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function SearchForm() {
  return (
    <form className='flex justify-between'>
      {/* sort */}
      <Select>
        <SelectTrigger>
          <SelectValue placeholder='정렬' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='latest'>전체</SelectItem>
          <SelectItem value='oldest'>별점순</SelectItem>
        </SelectContent>
      </Select>
      <div className='flex gap-2'>
        <Input className='w-[300px]' placeholder='검색어를 입력해주세요.' />
        <Button type='submit'>검색</Button>
      </div>
    </form>
  );
}

export default SearchForm;
