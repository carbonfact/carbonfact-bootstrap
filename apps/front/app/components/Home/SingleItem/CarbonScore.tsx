import { Item, RawMaterial } from '@/app/types/item.type';
import { Box, Card, Text } from '@radix-ui/themes';

interface CarbonScoreProps {
  item: Item;
}
export type ScoreColor = 'green' | 'orange' | 'red';

const getScoreColor = (score: number): ScoreColor => {
  if (score < 100) {
    return 'green';
  } else if (score >= 100 && score < 150) {
    return 'orange';
  }
  return 'red';
};
export const CarbonScore: React.FC<CarbonScoreProps> = ({ item }) => {
  const score: number = item.rawMaterials.reduce(
    (acc: number, obj: RawMaterial) => acc + obj.weight,
    0,
  );

  return (
    <Box style={{ minWidth: '220px', height: 'auto' }}>
      <Card size="2" style={{ textAlign: 'center' }}>
        Carbon score
        <br />
        <Text size="9" color={getScoreColor(score)}>
          {score}
        </Text>
      </Card>
    </Box>
  );
};
