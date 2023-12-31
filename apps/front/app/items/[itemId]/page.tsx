'use client';
import { SingleItem } from '@/app/components/Home/SingleItem/SingleItem';
import { useFetchItems } from '@/app/components/Home/hooks/useFetchItems';
import { Box } from '@radix-ui/themes';
import { useEffect, useRef, useState } from 'react';
import { singleItemContainerStyle } from '../page.css';

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
    <Box ref={containerRef} width={'100%'} height={'100%'}>
      <SingleItem
        width={width - 20}
        height={height}
        className={singleItemContainerStyle}
        item={item}
      ></SingleItem>
    </Box>
  );
}
