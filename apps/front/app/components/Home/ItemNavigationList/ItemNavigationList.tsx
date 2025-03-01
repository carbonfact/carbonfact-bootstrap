'use client';
import { Box } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import { useFetchItems } from '../hooks/useFetchItems';

const ItemNavigationList = () => {
  const { data: items, isLoading } = useFetchItems();
  return (
    <div className='w-32 flex flex-col gap-2'>
      {items?.map((anItem) => (
        <Link
          key={`itemNavigation-${anItem.id}`}
          href={`/items/${anItem.id}`}
          className='hover:bg-blue-500 p-2 rounded-md'
        >
          {anItem.name}
        </Link>
      ))}
    </div>
  );
};
export default ItemNavigationList;
