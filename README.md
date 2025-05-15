## 실행방법

1. 루트 디렉토리에 .env 추가 해주세요.
```
  NEXT_PUBLIC_API_URL=https://dummyjson.com
```
2. 터미널에 아래 명령어를 실행합니다.
```bash
npm install
npm run dev
```

## 체크리스트

### UI

- [x] 페이지 진입 시, 20개의 아이템이 기본으로 노출되어야 합니다.
- [x] 각 아이템은 다음의 항목을 포함합니다.
    - 상품명 (`title`)
    - 상품설명 (`description`)
    - 썸네일 이미지 (`thumbnail`)
    - 별점 (`rating`)
    - 리뷰 수 (`reviews`)
- [x] View 방식 종류
    - 리스트형 (List): 한 줄에 1개 아이템
    - 그리드형 (Grid): 한 줄에 4개 아이템
- [x] View 표시 조건은 다음과 같습니다.
    - 페이지 최초 진입 시 50% 확률로 랜덤하게 View 방식 결정
    - 결정된 방식은 24시간 동안 유지
    - 이후 다시 랜덤 결정
 
### 데이터 가져오기

- [x] [DummyJSON API Docs](https://dummyjson.com/docs/products#products-all) Products API를 활용하여 Data를 가져올 수 있습니다.

### 페이지네이션

- [x] [Limit과 Skip](https://dummyjson.com/docs/products#products-limit_skip)으로 페이지네이션 결과를 받을 수 있습니다.

### 검색 필터

- [x] [search API](https://dummyjson.com/docs/products#products-search)를 활용해 문자열 검색이 가능해야 합니다.
- [x] [sort API](https://dummyjson.com/docs/products#products-sort) 를 활용해 별점 (`rating`) 내림차순으로 정렬이 가능해야 합니다.
- [x] 필터는 form을 사용해 구현해야 하며, 아래 조건을 만족해야 합니다.
    - 검색 버튼이 존재해야 합니다.
    - 페이지 새로고침 후에도 필터 값이 유지되어야 합니다.
- [x] 검색 결과가 없을 경우 `일치하는 결과가 없습니다.` 문구가 표시되어야 합니다.

### 무한 스크롤

- [x] 페이지 하단 도달 시 다음 20개의 아이템이 자동으로 로드 되어야 합니다.
- [x] 필터 결과에도 무한 스크롤이 적용 되어야 합니다.
- [x] 마지막 데이터까지 로딩되면 `더 이상 불러올 수 없습니다.` 문구가 표시되어야 합니다.

## 폴더구조
```
├── src/                     
│   ├── app/                 # Next.js App Router
│   │   ├── (default)/       # 기본 레이아웃 라우트
│   │   │   ├── layout.tsx   # 기본 레이아웃 컴포넌트
│   │   │   ├── page.tsx     # 메인 페이지
│   │   │   └── search/      # 검색 라우트
│   │   │       └── page.tsx # 검색 페이지
│   │   ├── error.tsx        # 에러 페이지
│   │   ├── globals.css      # 전역 스타일
│   │   ├── layout.tsx       # 루트 레이아웃
│   │   ├── not-found.tsx    # Not Found 페이지
│   │   └── favicon.ico      # 파비콘
│   ├── components/          # 컴포넌트
│   │   ├── ui/              # shadcn UI 컴포넌트
│   │   └── commons/         # 공통 컴포넌트
│   │       ├── Banner.tsx   # 배너 컴포넌트
│   │       ├── List/        # 리스트 컴포넌트 모음
│   │       │   ├── List.tsx # 리스트 컴포넌트
│   │       │   ├── FlexItem.tsx # Flex 레이아웃 아이템
│   │       │   └── GridItem.tsx # Grid 레이아웃 아이템
│   │       └── Search/      # 검색 컴포넌트
│   │           └── SearchForm.tsx # 검색 폼 컴포넌트
│   ├── features/            # 기능별 모듈
│   │   ├── Home/            # 홈 기능
│   │   │   ├── api/         # 홈 API 연동
│   │   │   └── components/  # 홈 관련 컴포넌트
│   │   └── Search/          # 검색 기능
│   │       ├── api/         # 검색 API 연동
│   │       ├── components/  # 검색 관련 컴포넌트
│   │       └── types/       # 검색 관련 타입
│   ├── hooks/               # 커스텀 훅
│   │   └── useList.ts       # 리스트 관련 훅
│   ├── lib/                 # 유틸리티 및 라이브러리
│   ├── provider/            # 상태 관리 Provider
│   └── types/               # 전역 타입 정의
│       ├── api.d.ts         # API 관련 타입 정의
└──     └── layout.d.ts      # 레이아웃 관련 타입 정의
```

## 추가 라이브러리
- tailwindCSS
- shadcn
- react-query
- react-intersection-observer

## 구현하면서 신경써 구현한 점

### SEO 최적화

제품 리스트와 검색 제품 리스트 페이지의 seo 최적화를 위해 서버 컴포넌트에서 초기 20개의 데이터를 먼저 받아와 `initialData`로 각각의 리스트 컴포넌트로 `props`를 이용해서 넘겨주었습니다.
이후 `useList` 훅에서 `initialData`로 설정해 첫 요청으로 서버 컴포넌트에서 받은 데이터를 사용하여 seo 최적화 및 초기 렌더링 속도를 향상 시켰습니다.

### useList 공통훅 구현

처음 구현은 Product fetching을 위한 `useList`, Search Product fetching을 위한 `useSearch` 두개의 훅으로 구현햇습니다.
하지만 두 훅의 구조적으로 공통되는 부분을 확인했고, `fetch`함수를 매개변수로 받고, 타입을 제네릭으로 받아 fetching을 수행하는 공통훅 `useList`로 통합하여 재사용성을 향상 시켰습니다.
```
import { useInfiniteQuery } from '@tanstack/react-query';

import { ProductRes } from '@/types/api';

interface Props<T> {
  initialData: ProductRes;
  fetchFn: (params: T) => Promise<ProductRes>;
  params: T;
}

/**
 * 리스트 데이터 요청 훅
 * @param initialData : 초기 데이터
 * @param fetchFn : 데이터 요청 함수
 * @param params : 요청 파라미터
 * @returns 리스트 데이터
 */
const useList = <T>({ initialData, fetchFn, params }: Props<T>) => {
  const {
    data: products,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', params],
    queryFn: ({ pageParam }) => {
      // 제네릭 타입에 따른 파라미터 추가
      const fetchParams = {
        ...params,
        skip: pageParam,
      } as T;
      // 데이터 요청
      return fetchFn(fetchParams);
    },
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 5,
    initialPageParam: 0,
    // 초기 데이터 설정
    initialData: {
      pages: [initialData],
      pageParams: [0],
    },
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.skip + lastPage.limit;
      return nextOffset < lastPage.total ? nextOffset : undefined;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.products);
    },
  });

  const isEmpty = products?.length === 0;

  return { products, fetchNextPage, hasNextPage, isFetching, isEmpty };
};

export default useList;
```

## 이슈

구현하면서 발생한 이슈에 대해서 글이 길어 별도 문서로 정리하였습니다.

[이슈문서](https://cool-balloon-c2b.notion.site/issue-1f323482657f8044b6abd9b779c8acae?pvs=74) 참조 부탁드리겠습니다.

감사합니다.
