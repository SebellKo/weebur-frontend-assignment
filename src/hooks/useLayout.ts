'use client';

import { useLayoutEffect, useState } from 'react';
import { Layout } from '@/features/types/layout';
export const useLayout = () => {
  const [layout, setLayout] = useState<Layout>('flex');

  useLayoutEffect(() => {
    const { layout: storedLayout, timestamp } = JSON.parse(
      localStorage.getItem('layout') || '{}'
    );

    if (!storedLayout || timestamp < Date.now() - 1000 * 60 * 60 * 24) {
      const newLayout = Math.random() < 0.5 ? 'flex' : 'grid';
      localStorage.setItem(
        'layout',
        JSON.stringify({ layout: newLayout, timestamp: Date.now() })
      );
      setLayout(newLayout);
    }
  }, []);

  return { layout };
};
