'use client';
import { Item, RawMaterial } from '@/app/types/item.type';
import { Box, Flex } from '@radix-ui/themes';
import React from 'react';
import { BezierCurveComponent } from './BezierCurve';
import { CarbonScore } from './CarbonScore';
import RawMaterialSlider from './RawMaterialSlider';

interface SingleItemProps {
  className?: string;
  item: Item;
  width: number;
  height: number;
}

const MIN_CONTAINER_WIDTH = 350;

export const SingleItem: React.FC<SingleItemProps> = ({
  className,
  item,
  width,
  height,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [itemToDisplay, setItemToDisplay] = React.useState<Item | null>(null);

  React.useEffect(() => {
    if (item?.id !== itemToDisplay?.id) {
      setItemToDisplay(item);
    }
  }, [item]);

  if (!itemToDisplay) return <></>;

  const handleMaterialChange = (material: RawMaterial, index: number) => {
    itemToDisplay.rawMaterials[index] = material;
    setItemToDisplay({ ...itemToDisplay });
  };

  const slidersContainerWidth = Math.max(width - 220, MIN_CONTAINER_WIDTH);
  const slidersContainerHeight = Math.min(height, 300);
  return (
    <Flex align={'center'} className={className} ref={containerRef}>
      <Flex direction={'column'} grow={'1'}>
        <BezierCurveComponent
          svgHeight={slidersContainerHeight}
          style={{
            position: 'absolute',
            height: `${slidersContainerHeight}px`,
            width: `${slidersContainerWidth}px`,
          }}
          svgWidth={slidersContainerWidth}
          rawMaterials={itemToDisplay.rawMaterials}
        ></BezierCurveComponent>
        <Box>
          <Flex
            style={{
              height: `${slidersContainerHeight}px`,
              width: `${slidersContainerWidth}px`,
            }}
          >
            {itemToDisplay.rawMaterials.map((aRawMaterial, i) => (
              <RawMaterialSlider
                key={`rawMaterialSlider-${itemToDisplay?.id}${aRawMaterial?.name}`}
                rawMaterial={aRawMaterial}
                onChange={(material) => handleMaterialChange(material, i)}
              />
            ))}
          </Flex>
        </Box>
      </Flex>
      <CarbonScore item={itemToDisplay}></CarbonScore>
    </Flex>
  );
};
