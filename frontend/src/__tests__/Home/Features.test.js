import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Features from '../../components/Home/Features';
import backend from '../../components/Utils/backend';

// Mock the backend
jest.mock('../../components/Utils/backend', () => ({
  getFeaturesList: jest.fn()
}));

describe('Features Component', () => {
  // Sample mock data for features
  const mockFeatures = [{
    features: [
      {
        feature: 'Trip Planning',
        description: 'Comprehensive trip planning service',
      },
      {
        feature: 'Packing Assistance',
        description: 'Smart packing recommendations',
      }
    ]
  }];

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('Initial Rendering', () => {
    test('renders "Our Services" heading', async () => {
      // Mock successful API call
      backend.getFeaturesList.mockResolvedValue({ data: mockFeatures });

      render(<Features />);

      // Check for the section heading
      const headingElement = screen.getByText('Our Services');
      expect(headingElement).toBeInTheDocument();
    });

    test('fetches and renders features correctly', async () => {
      // Mock successful API call
      backend.getFeaturesList.mockResolvedValue({ data: mockFeatures });

      render(<Features />);

      // Wait for features to be rendered
      await waitFor(() => {
        const tripPlanningFeature = screen.getByText('Trip Planning');
        const packingAssistanceFeature = screen.getByText('Packing Assistance');
        
        expect(tripPlanningFeature).toBeInTheDocument();
        expect(packingAssistanceFeature).toBeInTheDocument();
      });
    });
  });

  describe('API Interaction', () => {
    test('calls getFeaturesList on component mount', async () => {
      // Mock successful API call
      backend.getFeaturesList.mockResolvedValue({ data: mockFeatures });

      render(<Features />);

      // Verify that getFeaturesList was called
      await waitFor(() => {
        expect(backend.getFeaturesList).toHaveBeenCalledTimes(1);
      });
    });

    test('handles API error gracefully', async () => {
      // Mock console.error to prevent error logging in test output
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Mock API error
      backend.getFeaturesList.mockRejectedValue(new Error('API Error'));

      render(<Features />);

      // Wait for error handling
      await waitFor(() => {
        expect(backend.getFeaturesList).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Something went wrong');
      });

      // Restore console.error
      consoleErrorSpy.mockRestore();
    });
  });

  describe('Accordion Rendering', () => {
    test('renders accordion with correct structure', async () => {
      // Mock successful API call
      backend.getFeaturesList.mockResolvedValue({ data: mockFeatures });

      render(<Features />);

      // Wait for features to be rendered
      await waitFor(() => {
        const features = mockFeatures[0].features;
        
        features.forEach((feature, index) => {
          // Check feature button
          const featureButton = screen.getByText(feature.feature);
          expect(featureButton).toBeInTheDocument();
          
          // Check feature description in accordion body
          const featureDescription = screen.getByText(feature.description);
          expect(featureDescription).toBeInTheDocument();

          // Check unique IDs for accordion items
          const accordionHeader = screen.getByTestId(`heading-${index + 1}`);
          const accordionCollapse = screen.getByTestId(`collapse-${index + 1}`);
          
          expect(accordionHeader).toBeInTheDocument();
          expect(accordionCollapse).toBeInTheDocument();
        });
      });
    });
  });

  // Snapshot test
  test('matches snapshot', async () => {
    // Mock successful API call
    backend.getFeaturesList.mockResolvedValue({ data: mockFeatures });

    const { asFragment } = render(<Features />);

    // Wait for features to be rendered
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});