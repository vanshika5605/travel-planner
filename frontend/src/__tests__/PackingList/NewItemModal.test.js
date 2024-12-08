import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewItemModal from '../../components/PackingList/NewItemModal';

describe('NewItemModal Component', () => {
  // Mock props to simulate a realistic scenario
  const mockPackingList = {
    'Clothing': [{ id: '1', name: 'T-Shirt', quantity: 2, packed: false }],
    'Electronics': [{ id: '2', name: 'Charger', quantity: 1, packed: false }]
  };
  
  const mockSetPackingList = jest.fn();
  const mockSetShowAddItemModal = jest.fn();

  const renderComponent = (props = {}) => {
    return render(
      <NewItemModal
        showAddItemModal={true}
        setShowAddItemModal={mockSetShowAddItemModal}
        packingList={mockPackingList}
        setPackingList={mockSetPackingList}
        {...props}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal with all essential form elements', () => {
    renderComponent();

    // Check main sections
    expect(screen.getByText('Add New Item')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter item name')).toBeInTheDocument();
    expect(screen.getByTestId('quantity-input')).toBeInTheDocument();
    
    // Check category radio buttons
    expect(screen.getByLabelText('Use Existing Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Create New Category')).toBeInTheDocument();
  });

  test('switches between existing and new category modes', () => {
    renderComponent();

    const existingCategoryRadio = screen.getByLabelText('Use Existing Category');
    const newCategoryRadio = screen.getByLabelText('Create New Category');

    // Switch to new category
    fireEvent.click(newCategoryRadio);
    expect(screen.getByPlaceholderText('Enter new category name')).toBeInTheDocument();

    // Switch back to existing category
    fireEvent.click(existingCategoryRadio);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('adds item to existing category', () => {
    renderComponent();

    // Fill out form for existing category
    fireEvent.change(screen.getByPlaceholderText('Enter item name'), { target: { value: 'Socks' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Clothing' } });
    const quantityInput = screen.getByTestId('quantity-input');
    fireEvent.change(quantityInput, { target: { value: '3' } });

    // Click Add Item
    fireEvent.click(screen.getByText('Add Item'));

    // Verify setPackingList was called
    expect(mockSetPackingList).toHaveBeenCalled();
    expect(mockSetShowAddItemModal).toHaveBeenCalledWith(false);
  });

  test('adds item to new category', () => {
    renderComponent();

    // Switch to new category
    fireEvent.click(screen.getByLabelText('Create New Category'));

    // Fill out form for new category
    fireEvent.change(screen.getByPlaceholderText('Enter item name'), { target: { value: 'Laptop' } });
    fireEvent.change(screen.getByPlaceholderText('Enter new category name'), { target: { value: 'Tech' } });
    const quantityInput = screen.getByTestId('quantity-input');
    fireEvent.change(quantityInput, { target: { value: '1' } });

    // Click Add Item
    fireEvent.click(screen.getByText('Add Item'));

    // Verify setPackingList was called
    expect(mockSetPackingList).toHaveBeenCalled();
    expect(mockSetShowAddItemModal).toHaveBeenCalledWith(false);
  });

  test('disables Add Item button with incomplete form', () => {
    renderComponent();

    // Add Item button should be disabled
    const addItemButton = screen.getByText('Add Item');
    expect(addItemButton).toBeDisabled();

    // Fill out item name
    fireEvent.change(screen.getByPlaceholderText('Enter item name'), { target: { value: 'Test Item' } });
    
    // If existing category is selected, button should still be disabled without selecting a category
    expect(addItemButton).toBeDisabled();

    // Select an existing category
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Clothing' } });
    
    // Now button should be enabled
    expect(addItemButton).toBeEnabled();
  });

  test('closes modal when Close button is clicked', () => {
    renderComponent();

    // Find and click the Close button
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    // Verify that setShowAddItemModal was called with false
    expect(mockSetShowAddItemModal).toHaveBeenCalledWith(false);
  });

  test('closes modal when close (X) button is clicked', () => {
    renderComponent();

    // Find and click the close button (typically a close icon/button in the modal header)
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    // Verify that setShowAddItemModal was called with false
    expect(mockSetShowAddItemModal).toHaveBeenCalledWith(false);
  });
});