import { itemsMock } from '@/__mocks__/handlers';
import { server } from '@/__mocks__/server';
import Providers from '@/app/Providers';

import '@testing-library/jest-dom';
import { RenderResult, render, screen, waitFor } from '@testing-library/react';
import ItemNavigationList from './ItemNavigationList';
global.ResizeObserver = require('resize-observer-polyfill');

// Initializing the mock server
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Home', () => {
  let renderResult: RenderResult;
  beforeEach(() => {
    renderResult = render(
      <Providers>
        <ItemNavigationList />
      </Providers>,
    );
  });
  it('should render successfully', () => {
    expect(renderResult.baseElement).toBeTruthy();
  });

  it('should render items when fetched', async () => {
    await waitFor(() => screen.getByText('Item1'));
    itemsMock.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
});
