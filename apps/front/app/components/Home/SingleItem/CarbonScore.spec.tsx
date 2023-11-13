import Providers from '@/app/Providers';
import '@testing-library/jest-dom';
import { RenderResult, cleanup, render, screen } from '@testing-library/react';
import { CarbonScore } from './CarbonScore';

global.ResizeObserver = require('resize-observer-polyfill');

describe('CarbonScore', () => {
  afterEach(cleanup); // Cleanup after each test

  it('should render successfully with a proper value', () => {
    const mockSelectedItem = {
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
    render(
      <Providers>
        <CarbonScore item={mockSelectedItem} />
      </Providers>,
    );
    expect(screen.getByText('Carbon score')).toBeInTheDocument();

    const carbonScore = mockSelectedItem.rawMaterials.reduce((acc, item) => {
      return acc + item.weight;
    }, 0);
    expect(screen.getByText(carbonScore)).toBeInTheDocument();
  });

  it('should render successfully with a proper color', () => {
    const colorMap = [
      { minValue: 0, color: 'green' },
      { minValue: 100, color: 'orange' },
      { minValue: 150, color: 'red' },
    ];

    let utils: RenderResult;

    colorMap.forEach((color, index) => {
      const mockSelectedItem = {
        id: 1,
        name: 'Item1',
        rawMaterials: [
          {
            name: 'RawMaterial1',
            weight: color.minValue,
            id: 1,
          },
        ],
      };
      if (index === 0) {
        utils = render(
          <Providers>
            <CarbonScore item={mockSelectedItem} />
          </Providers>,
        );
      } else {
        utils.rerender(
          <Providers>
            <CarbonScore item={mockSelectedItem} />
          </Providers>,
        );
      }

      const carbonScoreElement = screen.getByText('Carbon score');
      const childWithAttribute = carbonScoreElement.querySelector(
        '[data-accent-color]',
      );

      expect(childWithAttribute).toHaveAttribute(
        'data-accent-color',
        color.color,
      );
    });
  });
});
