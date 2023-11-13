'use client';
import { Box } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import { useFetchItems } from '../hooks/useFetchItems';
import { itemNavigationLinkStyle } from './ItemNavigationList.css';
interface ItemNavigationListProps {
  className?: string;
}
const ItemNavigationList: React.FC<ItemNavigationListProps> = ({
  className,
}) => {
  const { data: items, isLoading } = useFetchItems();
  return (
    <div className={className}>
      {items?.map((anItem) => (
        <Box key={`itemNavigation-${anItem.id}`}>
          <Link
            href={`/items/${anItem.id}`}
            className={itemNavigationLinkStyle}
          >
            <div>{anItem.name}</div>
          </Link>
        </Box>
      ))}
    </div>
  );
};
export default ItemNavigationList;
