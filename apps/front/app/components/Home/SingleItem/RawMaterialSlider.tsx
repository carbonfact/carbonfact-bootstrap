import { RawMaterial } from '@/app/types/item.type';
import { Flex, Slider } from '@radix-ui/themes';

interface RawMaterialSliderProps {
  rawMaterial: RawMaterial;
  onChange: (rawMaterial: RawMaterial) => void;
}
const RawMaterialSlider: React.FC<RawMaterialSliderProps> = ({
  rawMaterial,
  onChange,
}) => {
  const handleSliderChange = (value: number[]) => {
    [rawMaterial.weight] = value;
    onChange(rawMaterial);
  };
  return (
    <Flex
      justify={'between'}
      style={{ width: '100%', justifyContent: 'center' }}
      align={'center'}
      direction={'column'}
    >
      <Slider
        color="indigo"
        min={0}
        max={100}
        defaultValue={[rawMaterial.weight]}
        orientation="vertical"
        onValueChange={handleSliderChange}
      />
      {rawMaterial.name}
    </Flex>
  );
};

export default RawMaterialSlider;
