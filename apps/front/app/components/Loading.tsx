import { Box, Flex } from '@radix-ui/themes';
import BarLoader from 'react-spinners/BarLoader';

export default function Loading({ color = 'var(--accent-9)' }) {
  return (
    <Flex align={'center'} justify={'center'} direction={'column'}>
      <BarLoader color={color} />
      <Box mt="2">Loading...</Box>
    </Flex>
  );
}
