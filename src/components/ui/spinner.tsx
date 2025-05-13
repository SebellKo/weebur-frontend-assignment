'use client';

import { CSSProperties } from 'react';

interface SpinnerProps {
  size?: number;
  thickness?: number;
  className?: string;
}

export default function Spinner({
  size = 24,
  thickness = 2,
  className = '',
}: SpinnerProps) {
  const style: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderWidth: `${thickness}px`,
  };

  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <div
        style={style}
        className='animate-spin rounded-full border-gray-300 border-solid border-t-gray-600'
      />
    </div>
  );
}
