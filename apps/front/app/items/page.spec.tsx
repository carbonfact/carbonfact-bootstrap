import { server } from '@/__mocks__/server';
import Providers from '@/app/Providers';
import '@testing-library/jest-dom';
import { RenderResult, render } from '@testing-library/react';
import Items from './page';
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
        <Items />
      </Providers>,
    );
  });
  it('should render successfully', () => {
    expect(renderResult.baseElement).toBeTruthy();
  });
});
