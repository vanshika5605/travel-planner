import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import backend from '../components/Utils/backend';

// Mock dependencies
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
    { date: '2024-01-05', name: 'Friday Holiday' },
    { date: '2024-01-06', name: 'Saturday' },
    { date: '2024-01-07', name: 'Sunday' },
    { date: '2024-07-04', name: 'Independence Day' }
  ];

  const mockExchangeRates = {
    data: {
      rates: {
        USD: 1,
        EUR: 0.85,
        GBP: 0.75
      }
    }
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    jest.useFakeTimers();

    // Setup mock implementations
    backend.getHolidays.mockResolvedValue({ data: mockHolidays });
    backend.getExchangeRates.mockResolvedValue(mockExchangeRates);
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
        // Check if error message is displayed
        const errorAlert = screen.queryByRole('alert');
        expect(errorAlert).toBeInTheDocument();
        expect(errorAlert).toHaveTextContent('Error fetching holidays');
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
        // Check if error message is displayed
        const errorAlert = screen.queryByRole('alert');
        expect(errorAlert).toBeInTheDocument();
        expect(errorAlert).toHaveTextContent('Error fetching exchange rates');
      });

      consoleErrorSpy.mockRestore();
    });
  });
});