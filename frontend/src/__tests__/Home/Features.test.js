import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Features from '../../components/Home/Features';
import backend from '../../components/Utils/backend';

// Mock backend
jest.mock('../../components/Utils/backend', () => ({
  getFeaturesList: jest.fn()
}));

describe('Features Component', () => {
  // Mock features data
  const mockFeatures = [{
    features: [
      {
        feature: 'Trip Planning',
        description: 'Comprehensive trip planning services'
      },
      {
        feature: 'Packing Assistance',
        description: 'Smart packing list generator'
      }
    ]
  }];

  // Setup function to render component with mocked data
  const renderComponent = (features = mockFeatures) => {
    // Mock successful data fetch
    backend.getFeaturesList.mockResolvedValue({ data: features });

    return render(
      <Features 
        errorMessage=""
        setErrorMessage={jest.fn()}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders component title', async () => {
    renderComponent();

    // Wait for features to load
    await waitFor(() => {
      const titleElement = screen.getByText('Our Services');
      expect(titleElement).toBeInTheDocument();
    });
  });

  test('fetches and displays features correctly', async () => {
    renderComponent();

    // Wait for features to load
    await waitFor(() => {
      // Check if feature titles are rendered
      expect(screen.getByText('Trip Planning')).toBeInTheDocument();
      expect(screen.getByText('Packing Assistance')).toBeInTheDocument();
    });
  });

  test('renders accordion items with correct structure', async () => {
    renderComponent();

    await waitFor(() => {
      // Check accordion items
      const featureButtons = screen.getAllByRole('button', { expanded: false });
      expect(featureButtons).toHaveLength(2);

      // Check data attributes
      featureButtons.forEach((button, index) => {
        expect(button).toHaveAttribute('data-bs-target', `#collapse-${index + 1}`);
      });
    });
  });

  test('handles error when fetching features fails', async () => {
    // Mock error response
    const mockSetErrorMessage = jest.fn();
    backend.getFeaturesList.mockRejectedValue({
      response: { status: 500 }
    });

    render(
      <Features 
        errorMessage=""
        setErrorMessage={mockSetErrorMessage}
      />
    );

    // Wait for error handling
    await waitFor(() => {
      expect(mockSetErrorMessage).toHaveBeenCalledWith(
        "Service unavailable. Please try again later."
      );
    });
  });

  test('handles network error when fetching features', async () => {
    // Mock network error
    const mockSetErrorMessage = jest.fn();
    backend.getFeaturesList.mockRejectedValue(new Error('Network Error'));

    render(
      <Features 
        errorMessage=""
        setErrorMessage={mockSetErrorMessage}
      />
    );

    // Wait for error handling
    await waitFor(() => {
      expect(mockSetErrorMessage).toHaveBeenCalledWith(
        "Error: Could not connect to the server"
      );
    });
  });

  test('adds unique ids to features', async () => {
    renderComponent();

    await waitFor(() => {
      // Check if features have correct ids
      const firstFeatureHeading = screen.getByTestId('heading-1');
      const secondFeatureHeading = screen.getByTestId('heading-2');

      expect(firstFeatureHeading).toBeInTheDocument();
      expect(secondFeatureHeading).toBeInTheDocument();
    });
  });

  test('renders feature descriptions', async () => {
    renderComponent();

    await waitFor(() => {
      // Check feature descriptions
      expect(screen.getByText('Comprehensive trip planning services')).toBeInTheDocument();
      expect(screen.getByText('Smart packing list generator')).toBeInTheDocument();
    });
  });

  test('handles empty features list', async () => {
    // Render with empty features
    renderComponent([{ features: [] }]);

    await waitFor(() => {
      // Verify no accordion items are rendered
      const featureButtons = screen.queryAllByRole('button', { expanded: false });
      expect(featureButtons).toHaveLength(0);
    });
  });
});