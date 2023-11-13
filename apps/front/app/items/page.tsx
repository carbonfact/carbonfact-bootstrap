'use client';

import { Box, Text } from '@radix-ui/themes';
import EmptyHome from '../components/Home/EmptyHome';
import { useFetchItems } from '../components/Home/hooks/useFetchItems';
import Loading from '../components/Loading';

export default function Items() {
  const { data: items, isLoading } = useFetchItems();

  return (
    <main>
      {isLoading && <Loading></Loading>}

      {!isLoading && items && items.length > 0 ? (
        <div>
          <Text size="5">Carbon Fact Simulator</Text>
          <Box>
            <Text size="3">
              An easy way to evaluate ecological impact of decisions.
              <p>← To begin, select an item on the left panel.</p>
            </Text>
          </Box>
        </div>
      ) : (
        !isLoading && <EmptyHome></EmptyHome>
      )}
    </main>
  );
}
