import { RawMaterial } from '@/app/types/item.type';
import { Slider } from '@radix-ui/themes';

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
    <div className="flex flex-col items-center w-full justify-center">
      <Slider
        color="indigo"
        min={0}
        max={100}
        defaultValue={[rawMaterial.weight]}
        orientation="vertical"
        onValueChange={handleSliderChange}
      />
      {rawMaterial.name}
    </div>
  );
};

export default RawMaterialSlider;
