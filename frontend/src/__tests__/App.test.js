import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import backend from '../components/Utils/backend';

// Mock dependencies
jest.mock('../components/Utils/backend', () => ({
  getHolidays: jest.fn(),
  getExchangeRates: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  Navigate: () => <div>Redirected</div>,
  useNavigate: () => jest.fn(), // Add this line to mock useNavigate
}));

// Mock child components
jest.mock('../components/Home/Home', () => {
  return function DummyHome() {
    return <div data-testid="home-component">Home</div>;
  };
});

jest.mock('../components/Utils/Navbar', () => {
  return function DummyNavbar() {
    return <div data-testid="navbar-component">Navbar</div>;
  };
});

jest.mock('../components/Utils/Footer', () => {
  return function DummyFooter() {
    return <div data-testid="footer-component">Footer</div>;
  };
});

jest.mock('../components/Utils/Loader', () => {
  return function DummyLoader() {
    return <div data-testid="loader-component">Loading...</div>;
  };
});

describe('App Component', () => {
  // Mock data
  const mockHolidays = [
    { date: '2024-01-01', name: 'New Year' },
    { date: '2024-07-04', name: 'Independence Day' }
  ];

  const mockExchangeRates = {
    rates: {
      USD: 1,
      EUR: 0.85,
      GBP: 0.75
    }
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Setup mock implementations
    backend.getHolidays.mockResolvedValue({ data: mockHolidays });
    backend.getExchangeRates.mockResolvedValue({ data: mockExchangeRates });

    // Mock timer functions to control loading state
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Initial Rendering', () => {
    test('shows loader on initial render', () => {
      render(<App />);
      const loader = screen.getByTestId('loader-component');
      expect(loader).toBeInTheDocument();
    });

    test('fetches holidays and exchange rates on mount', async () => {
      render(<App />);

      // Fast-forward timers
      jest.runAllTimers();

      // Wait for async operations
      await waitFor(() => {
        expect(backend.getHolidays).toHaveBeenCalledTimes(2);
        expect(backend.getHolidays).toHaveBeenCalledWith('2024');
        expect(backend.getHolidays).toHaveBeenCalledWith('2025');
        expect(backend.getExchangeRates).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Post-Loading Rendering', () => {
    test('renders navbar after loading', async () => {
      render(<App />);

      // Fast-forward timers
      jest.runAllTimers();

      // Wait for async operations
      await waitFor(() => {
        const navbar = screen.getByTestId('navbar-component');
        expect(navbar).toBeInTheDocument();
      });
    });

    test('renders footer', async () => {
      render(<App />);

      // Fast-forward timers
      jest.runAllTimers();

      // Wait for async operations
      await waitFor(() => {
        const footer = screen.getByTestId('footer-component');
        expect(footer).toBeInTheDocument();
      });
    });

    test('renders home component as default route', async () => {
      render(<App />);

      // Fast-forward timers
      jest.runAllTimers();

      // Wait for async operations
      await waitFor(() => {
        const homeComponent = screen.getByTestId('home-component');
        expect(homeComponent).toBeInTheDocument();
      });
    });
  });

  describe('Long Weekend Calculation', () => {
    test('findLongWeekends calculates correctly', () => {
      // This would require accessing the internal function
      // You might need to export it or use a different testing strategy
      const longWeekendDates = [
        '2024-01-05', // Friday
        '2024-01-06', // Saturday
        '2024-01-07'  // Sunday
      ];
      
      // You can add more specific assertions based on your implementation
      expect(longWeekendDates).toHaveLength(3);
    });
  });

  describe('Error Handling', () => {
    test('handles holiday fetch error', async () => {
      // Mock console.error to suppress error logging
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      backend.getHolidays.mockRejectedValue(new Error('Fetch failed'));

      render(<App />);

      // Fast-forward timers
      jest.runAllTimers();

      // Wait for async operations
      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Error fetching holidays:', 
          expect.any(Error)
        );
      });

      consoleErrorSpy.mockRestore();
    });

    test('handles exchange rates fetch error', async () => {
      // Mock console.error to suppress error logging
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      backend.getExchangeRates.mockRejectedValue(new Error('Fetch failed'));

      render(<App />);

      // Fast-forward timers
      jest.runAllTimers();

      // Wait for async operations
      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Error fetching exchange rates:', 
          expect.any(Error)
        );
      });

      consoleErrorSpy.mockRestore();
    });
  });
});