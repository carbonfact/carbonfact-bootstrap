import Providers from '@/app/Providers';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import RawMaterialSlider from './RawMaterialSlider';

global.ResizeObserver = require('resize-observer-polyfill');

describe('RawMaterialSlider', () => {
  it('should render successfully', () => {
    const rawMaterial = {
      name: 'RawMaterial1',
      weight: 1,
      id: 1,
    };
    const onChangeFn = jest.fn();
    const { baseElement } = render(
      <Providers>
        <RawMaterialSlider rawMaterial={rawMaterial} onChange={onChangeFn} />
      </Providers>,
    );
    expect(baseElement).toBeTruthy();
  });
});
