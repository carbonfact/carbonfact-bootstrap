import { server } from '@/__mocks__/server';
import Providers from '@/app/Providers';
import '@testing-library/jest-dom';
import {
  RenderResult,
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import CreateItemDialog from './CreateItemDialog';

global.ResizeObserver = require('resize-observer-polyfill');

let renderResult: RenderResult;
beforeAll(() => server.listen());

beforeEach(() => {
  renderResult = render(
    <Providers>
      <CreateItemDialog />
    </Providers>,
  );
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

describe('CreateItemDialog', () => {
  it('should render successfully', () => {
    expect(renderResult.baseElement).toBeTruthy();
  });

  it('should have a button to open the dialog', () => {
    expect(screen.getByText('Add an item to the catalog')).toBeTruthy();
  });

  it('should open the dialog when button is clicked', async () => {
    const button = screen.getByText('Add an item to the catalog');

    act(() => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeTruthy();
    });
  });

  it('closes the dialog when Cancel button is clicked', async () => {
    const button = screen.getByText('Add an item to the catalog');

    act(() => {
      fireEvent.click(button);
    });

    const cancelButton = screen.getByText('Cancel');
    act(() => {
      fireEvent.click(cancelButton);
    });
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  it('should create new raw material fields when button is clicked', () => {
    const button = screen.getByText('Add an item to the catalog');

    act(() => {
      fireEvent.click(button);
    });

    const addRawMaterialButton = screen.getByText('Add a Raw Material');

    let existingRawMaterials = screen.queryAllByText(/Raw Material \d+/);
    const initialCount = existingRawMaterials.length;

    act(() => {
      fireEvent.click(addRawMaterialButton);
    });

    existingRawMaterials = screen.queryAllByText(/Raw Material \d+/);
    expect(existingRawMaterials.length).toBe(initialCount + 1);
  });

  it('requires raw material weight to be non-negative', async () => {
    const button = screen.getByText('Add an item to the catalog');
    act(() => {
      fireEvent.click(button);
    });

    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());

    const addRawMaterialButton = screen.getByText('Add a Raw Material');

    act(() => {
      fireEvent.click(addRawMaterialButton);
    });

    const weightInput = screen.getByLabelText('Weight');

    act(() => {
      fireEvent.change(weightInput, { target: { value: '-1' } });
    });

    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeDisabled();
  });
  it('saves correctly when all conditions are met', async () => {
    const button = screen.getByText('Add an item to the catalog');
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());

    const itemNameInput = screen.getByLabelText('Item Name');
    fireEvent.change(itemNameInput, { target: { value: 'Test Item' } });

    const addRawMaterialButton = screen.getByText('Add a Raw Material');
    fireEvent.click(addRawMaterialButton);

    const rawMaterialNameInput = screen.getByLabelText('Raw Material 1');
    fireEvent.change(rawMaterialNameInput, { target: { value: 'Material' } });

    const weightInput = screen.getByLabelText('Weight');
    fireEvent.change(weightInput, { target: { value: '10' } });

    const saveButton = screen.getByText('Save');

    act(() => {
      fireEvent.click(saveButton);
    });
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
