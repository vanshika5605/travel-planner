import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PrintShare from '../../components/PackingList/PrintShare';

describe('PrintShare Component', () => {
  // Mock data to simulate component props
  const mockTripDetails = {
    destination: 'Paris',
    startDate: '2024-07-01',
    endDate: '2024-07-10',
    travelers: 2,
    tripType: 'Vacation'
  };

  const mockPackingList = {
    'Clothing': [
      { name: 'T-Shirt', quantity: 2, packed: false },
      { name: 'Jeans', quantity: 1, packed: true }
    ],
    'Electronics': [
      { name: 'Charger', quantity: 1, packed: false }
    ]
  };

  // Mocking window methods
  const mockWindowOpen = jest.fn(() => ({
    document: {
      write: jest.fn(),
      close: jest.fn()
    },
    print: jest.fn()
  }));

  const mockAlert = jest.fn();

  // Store the original navigator.share
  let originalNavigatorShare;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Store the original navigator.share
    originalNavigatorShare = navigator.share;

    // Setup global mocks
    window.open = mockWindowOpen;
    window.alert = mockAlert;
  });

  afterEach(() => {
    // Restore the original navigator.share after each test
    if (originalNavigatorShare !== undefined) {
      navigator.share = originalNavigatorShare;
    } else {
      delete navigator.share;
    }
  });

  test('renders print and share buttons', () => {
    render(<PrintShare tripDetails={mockTripDetails} packingList={mockPackingList} />);

    const printButton = screen.getByTestId('print-btn');
    const shareButton = screen.getByTestId('share-btn');

    expect(printButton).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
  });

  test('handles print functionality', () => {
    render(<PrintShare tripDetails={mockTripDetails} packingList={mockPackingList} />);

    const printButton = screen.getByTestId('print-btn');
    fireEvent.click(printButton);

    // Verify window.open was called
    expect(mockWindowOpen).toHaveBeenCalled();

    // Check if document.write was called with trip details and packing list
    const windowOpenCall = mockWindowOpen.mock.results[0].value.document.write;
    const writtenContent = windowOpenCall.mock.calls[0][0];

    expect(writtenContent).toContain('Packing List for Paris');
    expect(writtenContent).toContain('2024-07-01 - 2024-07-10');
    expect(writtenContent).toContain('T-Shirt (Qty: 2)');
    expect(writtenContent).toContain('Jeans (Qty: 1)');
    expect(writtenContent).toContain('Charger (Qty: 1)');
  });

  test('handles share functionality when supported', async () => {
    // Create a mock share function
    const mockShareFn = jest.fn().mockResolvedValue(true);

    // Safely mock navigator.share
    Object.defineProperty(navigator, 'share', {
      value: mockShareFn,
      configurable: true,
      writable: true
    });

    render(<PrintShare tripDetails={mockTripDetails} packingList={mockPackingList} />);

    const shareButton = screen.getByTestId('share-btn');
    fireEvent.click(shareButton);

    // Wait for any promises to resolve
    await screen.findByTestId('share-btn');

    // Verify navigator.share was called with correct parameters
    expect(mockShareFn).toHaveBeenCalledWith({
      title: 'Packing List for Paris',
      text: expect.stringContaining('CLOTHING:')
    });
  });

  test('shows alert when share is not supported', () => {
    // Remove navigator.share
    delete navigator.share;

    render(<PrintShare tripDetails={mockTripDetails} packingList={mockPackingList} />);

    const shareButton = screen.getByTestId('share-btn');
    fireEvent.click(shareButton);

    // Verify alert was called
    expect(mockAlert).toHaveBeenCalledWith('Sharing not supported on this browser');
  });
});