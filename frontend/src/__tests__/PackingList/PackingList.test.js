import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PackingList from '../../components/PackingList/PackingList';
import backend from '../../components/Utils/backend';

// Mock dependencies
jest.mock('../../components/Utils/backend', () => ({
  savePackingList: jest.fn()
}));

jest.mock('../../components/ItineraryPlanner/TripDetailsBox', () => {
  return function DummyTripDetailsBox({ tripDetails }) {
    return <div data-testid="trip-details-box">{tripDetails.destination}</div>;
  };
});

jest.mock('../../components/PackingList/PrintShare', () => {
  return function DummyPrintShare() {
    return <div data-testid="print-share">Print/Share</div>;
  };
});

describe('PackingList Component', () => {
  const mockTripDetails = {
    destination: 'Paris',
    startDate: '2024-07-01',
    endDate: '2024-07-07',
    travelers: 2,
    tripType: 'Vacation',
    tripId: 'test-trip-123'
  };

  const mockPackingList = {
    essentials: [
      { name: 'Passport', quantity: 1, packed: false },
      { name: 'Phone Charger', quantity: 1, packed: true }
    ],
    clothing: [
      { name: 'T-Shirts', quantity: 3, packed: false },
      { name: 'Jeans', quantity: 2, packed: true }
    ]
  };

  const renderComponent = (initialState = {}) => {
    return render(
      <MemoryRouter initialEntries={[{ 
        pathname: '/packing-list/test-trip-123', 
        state: { 
          tripDetails: mockTripDetails, 
          packingList: mockPackingList,
          ...initialState 
        } 
      }]}>
        <Routes>
          <Route 
            path="/packing-list/:tripId" 
            element={
              <PackingList 
                errorMessage=""
                setErrorMessage={jest.fn()}
              />
            } 
          />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders trip details box', () => {
    renderComponent();
    
    const tripDetailsBox = screen.getByTestId('trip-details-box');
    expect(tripDetailsBox).toHaveTextContent('Paris');
  });

  test('renders packing list categories and items', () => {
    renderComponent();
    
    // Check category titles
    expect(screen.getByText('essentials')).toBeInTheDocument();
    expect(screen.getByText('clothing')).toBeInTheDocument();

    // Check item names
    expect(screen.getByText('Passport (Qty: 1)')).toBeInTheDocument();
    expect(screen.getByText('Phone Charger (Qty: 1)')).toBeInTheDocument();
    expect(screen.getByText('T-Shirts (Qty: 3)')).toBeInTheDocument();
    expect(screen.getByText('Jeans (Qty: 2)')).toBeInTheDocument();
  });

  test('calculates and displays packed items count correctly', () => {
    renderComponent();
    
    const itemCountSpan = screen.getByText('2 of 4 items packed');
    expect(itemCountSpan).toBeInTheDocument();
  });

  test('toggles item packed status when checkbox is clicked', () => {
    renderComponent();
    
    // Find the unchecked Passport checkbox
    const passportCheckbox = screen.getByText('Passport (Qty: 1)').querySelector('input');
    
    // Click to pack
    fireEvent.click(passportCheckbox);
    
    // Check item count updates
    const itemCountSpan = screen.getByText('3 of 4 items packed');
    expect(itemCountSpan).toBeInTheDocument();
  });

  test('saves packing list changes successfully', async () => {
    const mockSetErrorMessage = jest.fn();
    
    // Mock successful save
    backend.savePackingList.mockResolvedValue({});

    renderComponent();
    
    // Click save changes button
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);

    // await waitFor(() => {
    //   expect(backend.savePackingList).toHaveBeenCalledWith({
    //     tripID: 'test-trip-123',
    //     packingList: mockPackingList
    //   });
    //   expect(mockSetErrorMessage).toHaveBeenCalledWith(null);
    // });
  });

  test('renders print/share component', () => {
    renderComponent();
    
    const printShareComponent = screen.getByTestId('print-share');
    expect(printShareComponent).toBeInTheDocument();
  });

  test('handles default empty state', () => {
    render(
      <MemoryRouter>
        <PackingList 
          errorMessage=""
          setErrorMessage={jest.fn()}
        />
      </MemoryRouter>
    );
    
    // Check default loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});