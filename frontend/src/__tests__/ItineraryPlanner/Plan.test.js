import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Plan from '../../components/ItineraryPlanner/Plan';

// Mock child components to isolate Plan component testing
jest.mock('../../components/ItineraryPlanner/ItineraryPlanner', () => {
  return function MockItineraryPlanner(props) {
    return <div data-testid="itinerary-planner">Itinerary Planner (formType: {props.formType})</div>;
  };
});

jest.mock('../../components/ItineraryPlanner/TravelStyleQuiz', () => {
  return function MockTravelStyleQuiz() {
    return <div data-testid="travel-style-quiz">Travel Style Quiz</div>;
  };
});

jest.mock('../../components/ItineraryPlanner/CustomCalendar', () => {
  return function MockCustomCalendar(props) {
    return <div data-testid="custom-calendar">Custom Calendar</div>;
  };
});

jest.mock('../../components/ItineraryPlanner/CurrencyConverter', () => {
  return function MockCurrencyConverter(props) {
    return <div data-testid="currency-converter">Currency Converter</div>;
  };
});

const mockProps = {
  userId: 'test-user-123',
  holidays: [],
  longWeekends: [],
  rates: {},
  currencies: []
};

describe('Plan Component', () => {
  // Initial Render Tests
  describe('Initial Render', () => {
    test('renders initial "Take a Break" section', () => {
      render(<Plan {...mockProps} />);
      
      expect(screen.getByText('Take a Break')).toBeInTheDocument();
      expect(screen.getByText('I already know my dream destination')).toBeInTheDocument();
      expect(screen.getByText('Need inspiration? Let us guide you')).toBeInTheDocument();
    });

    test('renders child components in default view', () => {
      render(<Plan {...mockProps} />);
      
      expect(screen.getByTestId('travel-style-quiz')).toBeInTheDocument();
      expect(screen.getByTestId('custom-calendar')).toBeInTheDocument();
      expect(screen.getByTestId('currency-converter')).toBeInTheDocument();
    });
  });

  // Plan Mode Interaction Tests
  describe('Plan Mode Interactions', () => {
    test('switches to plan mode when "known destination" button is clicked', () => {
      render(<Plan {...mockProps} />);
      
      const knownDestinationButton = screen.getByText('I already know my dream destination');
      fireEvent.click(knownDestinationButton);
      
      expect(screen.getByTestId('itinerary-planner')).toBeInTheDocument();
      expect(screen.getByText(/Itinerary Planner \(formType: known\)/)).toBeInTheDocument();
    });

    test('switches to plan mode when "need inspiration" button is clicked', () => {
      render(<Plan {...mockProps} />);
      
      const inspirationButton = screen.getByText('Need inspiration? Let us guide you');
      fireEvent.click(inspirationButton);
      
      expect(screen.getByTestId('itinerary-planner')).toBeInTheDocument();
      expect(screen.getByText(/Itinerary Planner \(formType: unknown\)/)).toBeInTheDocument();
    });

    test('can go back from plan mode to initial view', () => {
      render(<Plan {...mockProps} />);
      
      const knownDestinationButton = screen.getByText('I already know my dream destination');
      fireEvent.click(knownDestinationButton);
      
      const backButton = screen.getByText('← Back to Options');
      fireEvent.click(backButton);
      
      expect(screen.getByText('Take a Break')).toBeInTheDocument();
      expect(screen.queryByTestId('itinerary-planner')).not.toBeInTheDocument();
    });
  });

  // Props Passing Tests
  describe('Props Passing', () => {
    test('passes correct props to child components', () => {
      render(<Plan {...mockProps} />);
      
      const currencyConverter = screen.getByTestId('currency-converter');
      const customCalendar = screen.getByTestId('custom-calendar');
      
      expect(currencyConverter).toBeInTheDocument();
      expect(customCalendar).toBeInTheDocument();
    });
  });

  // Image Load Tests
  describe('Image Loading', () => {
    test('renders expected number of images', () => {
      render(<Plan {...mockProps} />);
      
      const images = document.querySelectorAll('.image-item');
      expect(images.length).toBe(12);
    });

    test('images have correct alt text', () => {
      render(<Plan {...mockProps} />);
      
      const images = document.querySelectorAll('.image-item');
      images.forEach(img => {
        expect(img.getAttribute('alt')).toBe('Loading...');
      });
    });
  });
});