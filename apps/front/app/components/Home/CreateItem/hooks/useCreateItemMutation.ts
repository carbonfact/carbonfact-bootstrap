import { Item } from '@/app/types/item.type';
import { createItemUrl } from '@/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createItem: Item) => {
      return axios.post<Item>(createItemUrl, createItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['items']);
    },
  });
};
