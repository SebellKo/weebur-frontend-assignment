'use client';

import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

import { Product } from '@/types/api';
import { Layout } from '@/types/layout';

import FlexItem from '@/components/commons/List/FlexItem';
import GridItem from '@/components/commons/List/GridItem';
import Spinner from '@/components/ui/spinner';

interface Props {
  products: Product[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetching: boolean;
  isEmpty?: boolean;
}

/**
 * 리스트 컴포넌트
 * @param products : 상품 정보
 * @param hasNextPage : 다음 페이지 존재 여부
 * @param fetchNextPage : 다음 페이지 데이터 요청
 * @param isFetching : 데이터 요청 상태
 * @param isEmpty : 데이터 비어있는 여부
 */
function List({
  products,
  hasNextPage,
  fetchNextPage,
  isFetching,
  isEmpty,
}: Props) {
  // 현재 레이아웃 상태
  const [currentLayout, setCurrentLayout] = useState<Layout | null>(null);
  // 레이아웃 로딩 상태를 관리하는 별도의 상태
  const [isLayoutLoading, setIsLayoutLoading] = useState(true);
  // 무한 스크롤 컴포넌트
  const { ref, inView } = useInView();

  useEffect(() => {
    // 레이아웃 정보 가져오기
    const { layout, timestamp } = JSON.parse(
      localStorage.getItem('layout') || '{}'
    );

    // 레이아웃 정보가 없거나 24시간 이상 지났으면 새로운 레이아웃 설정
    if (!layout || timestamp < Date.now() * 1000) {
      // if (!layout || timestamp < Date.now() - 1000 * 60 * 60 * 24) {
      // 로딩 상태로 설정
      setIsLayoutLoading(true);
      // 새로운 레이아웃 계산
      const newLayout = Math.random() < 0.5 ? 'flex' : 'grid';
      localStorage.setItem(
        'layout',
        JSON.stringify({ layout: newLayout, timestamp: Date.now() })
      );
      // 레이아웃 설정 및 로딩 상태 해제
      setCurrentLayout(newLayout);
      setIsLayoutLoading(false);
    } else {
      setCurrentLayout(layout);
      setIsLayoutLoading(false);
    }
  }, []);

  useEffect(() => {
    // 무한 스크롤 컴포넌트가 보이고 다음 페이지가 존재하면 다음 페이지 데이터 요청
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // 레이아웃이 로딩 중이거나 결정되지 않았으면 스피너 표시
  if (isLayoutLoading || !currentLayout) {
    return (
      <div className='flex justify-center items-center mt-10'>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {/* 레이아웃 정보에 따른 레이아웃 적용 */}
      <ul
        className={`${
          currentLayout === 'flex'
            ? 'flex flex-col gap-3 p-3'
            : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3'
        }`}
      >
        {products.map((product) => {
          return currentLayout === 'flex' ? (
            <FlexItem key={product.id} product={product} />
          ) : (
            <GridItem key={product.id} product={product} />
          );
        })}
        <div ref={ref} />
      </ul>
      {/* 다음 페이지가 없는 경우 */}
      {!isEmpty && !hasNextPage && (
        <div className='flex justify-center items-center h-10'>
          <p className='text-sm text-gray-500'>더 이상 불러올 수 없습니다.</p>
        </div>
      )}
      {/* 데이터 요청 중인 경우 */}
      {isFetching && (
        <div className='flex justify-center items-center h-10'>
          <Spinner />
        </div>
      )}
      {/* 데이터가 없는 경우 */}
      {isEmpty && (
        <div className='flex justify-center items-center h-10'>
          <p className='text-sm text-gray-500'>일치하는 결과가 없습니다.</p>
        </div>
      )}
    </>
  );
}

export default List;
