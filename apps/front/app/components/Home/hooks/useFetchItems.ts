import { Item } from '@/app/types/item.type';
import { fetchItemsUrl } from '@/config';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFetchItems = () =>
  useQuery({
    queryKey: ['items'],
    queryFn: () => axios.get<Item[]>(fetchItemsUrl).then((res) => res.data),
  });
