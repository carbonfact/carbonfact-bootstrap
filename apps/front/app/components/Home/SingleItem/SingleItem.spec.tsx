import Providers from '@/app/Providers';
import { Item } from '@/app/types/item.type';
import '@testing-library/jest-dom';
import { RenderResult, render, screen } from '@testing-library/react';
import { SingleItem } from './SingleItem';

global.ResizeObserver = require('resize-observer-polyfill');

describe('SingleItem', () => {
  let renderResult: RenderResult;
  let selectedItemMock: Item;
  beforeEach(() => {
    selectedItemMock = {
      id: 1,
      name: 'Item1',
      rawMaterials: [
        {
          name: 'RawMaterial1',
          weight: 1,
          id: 1,
        },
      ],
    };
    renderResult = render(
      <Providers>
        <SingleItem width={200} height={200} item={selectedItemMock} />
      </Providers>,
    );
  });
  it('should render successfully', () => {
    expect(renderResult.baseElement).toBeTruthy();
  });

  it('should render raw materials', async () => {
    selectedItemMock.rawMaterials.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
  it('should render carbonscore sliders when item is selected', async () => {
    const sliders = screen.getAllByRole('slider');
    selectedItemMock.rawMaterials.forEach((item) => {
      const expectedValue = item.weight.toString();
      const matchingSlider = sliders.find(
        (slider) => slider.getAttribute('aria-valuenow') === expectedValue,
      );
      expect(matchingSlider).toBeDefined();
    });
  });
  it('should display carbonscore', async () => {
    expect(screen.getByText('Carbon score')).toBeInTheDocument();

    const carbonScore = selectedItemMock.rawMaterials.reduce((acc, item) => {
      return acc + item.weight;
    }, 0);
    expect(screen.getByText(carbonScore)).toBeInTheDocument();
  });
});
