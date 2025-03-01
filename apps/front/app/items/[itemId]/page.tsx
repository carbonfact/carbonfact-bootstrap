'use client';
import { SingleItem } from '@/app/components/Home/SingleItem/SingleItem';
import { useFetchItems } from '@/app/components/Home/hooks/useFetchItems';
import { useEffect, useRef, useState } from 'react';

type SingleItemProps = {
  params: { itemId: number };
};

const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default function SingleItemPage({ params }: SingleItemProps) {
  const { data: items, isLoading } = useFetchItems();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemId = Number(params.itemId);
  const item = items?.find((anItem) => anItem.id === itemId);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        setWidth(width);
        setHeight(height);
      }
    };
    updateDimensions();

    const debouncedUpdateDimensions = debounce(updateDimensions, 200);

    window.addEventListener('resize', debouncedUpdateDimensions);

    return () => {
      window.removeEventListener('resize', debouncedUpdateDimensions);
    };
  }, [hasRendered]);

  if (!item) return <></>;
  if (!hasRendered) {
    setHasRendered(true);
  }
  return (
    <div ref={containerRef} className='w-full h-full'>
      <SingleItem
        width={width - 20}
        height={height}
        item={item}
      ></SingleItem>
    </div>
  );
}
