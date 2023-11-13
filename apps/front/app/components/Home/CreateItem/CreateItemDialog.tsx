'use client';
import { RawMaterial } from '@/app/types/item.type';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button, Dialog, Flex, Grid, Text, TextField } from '@radix-ui/themes';
import React from 'react';
import LabelledInput from '../../common/LabelledInput';
import { useCreateItemMutation } from './hooks/useCreateItemMutation';

const CreateItemDialog: React.FC = ({}) => {
  const { mutate } = useCreateItemMutation();

  const [rawMaterials, setRawMaterials] = React.useState<RawMaterial[]>([]);
  const [itemName, setItemName] = React.useState('');

  const updateRawMaterial = (index: number, rawMaterial: RawMaterial) => {
    const updatedRawMaterials: RawMaterial[] = [...rawMaterials];
    updatedRawMaterials[index] = rawMaterial;
    setRawMaterials(updatedRawMaterials);
  };

  const isSaveDisabled =
    rawMaterials.length === 0 ||
    itemName.length === 0 ||
    rawMaterials.some(
      (rawMaterial) => rawMaterial.name.length === 0 || rawMaterial.weight < 0,
    );

  const handleSave = () => {
    mutate({
      rawMaterials,
      name: itemName,
    });
  };
  const handleAddRawMaterial = () => {
    setRawMaterials([...rawMaterials, { name: '', weight: 0 }]);
  };

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Flex justify="end">
            <Button>
              <PlusIcon></PlusIcon> Add an item to the catalog
            </Button>
          </Flex>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 550 }}>
          <Dialog.Title> Add an item to the catalog</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Please input item details to add it to the simulation.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Item Name
              </Text>
              <TextField.Input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </label>

            {rawMaterials.map((aRawMaterial, index) => (
              <Grid columns="2" gap="2" key={`addRawMaterial${index}`}>
                <LabelledInput
                  label={`Raw Material ${index + 1}`}
                  value={aRawMaterial.name}
                  type="text"
                  onChange={(e) =>
                    updateRawMaterial(index, {
                      ...aRawMaterial,
                      name: e.target.value,
                    })
                  }
                />
                <LabelledInput
                  label="Weight"
                  value={aRawMaterial.weight}
                  type="text"
                  onChange={(e) =>
                    updateRawMaterial(index, {
                      ...aRawMaterial,
                      weight: parseInt(e.target.value, 10) || 0,
                    })
                  }
                />
              </Grid>
            ))}
            <Flex justify="end" p="3">
              <Button onClick={handleAddRawMaterial}>
                <PlusIcon></PlusIcon> Add a Raw Material
              </Button>
            </Flex>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button disabled={isSaveDisabled} onClick={handleSave}>
                Save
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default CreateItemDialog;
