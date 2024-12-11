import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Bar } from 'react-chartjs-2';
import { WorldMap } from 'react-svg-worldmap';
import AdminPage from '../../components/AdminPage/AdminPage';
import backend from '../../components/Utils/backend';

// Mock dependencies
jest.mock('../../components/Utils/backend');
jest.mock('react-chartjs-2', () => ({
  Bar: jest.fn(() => null)
}));
jest.mock('react-svg-worldmap', () => ({
  WorldMap: jest.fn(() => null)
}));
jest.mock('lucide-react', () => ({
  Calendar: () => null,
  Globe: () => null,
  Map: () => null,
  Plane: () => null,
  Plus: () => null,
  Users: () => null,
}));

describe('AdminPage Component', () => {
  const mockSetErrorMessage = jest.fn();
  const defaultStats = {
    totalUsers: 5234,
    newUsers: 456,
    upcomingTrips: 342,
    pastTrips: 1245,
    popularMonths: [
      { name: "January", count: 210 },
      { name: "December", count: 320 },
    ],
    popularDestinations: [
      { count: 842, destination: "France" },
      { count: 723, destination: "Japan" },
    ],
    usersByCountry: [
      { code: "US", name: "United States", users: 1500 },
      { code: "CA", name: "Canada", users: 800 },
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
    backend.getUserStatistics.mockResolvedValue({
      data: { data: defaultStats }
    });
  });

  const renderComponent = () => {
    return render(
      <AdminPage 
        errorMessage={null} 
        setErrorMessage={mockSetErrorMessage} 
      />
    );
  };

  test('renders main statistics cards', async () => {
    renderComponent();

    // Wait for component to render
    await waitFor(() => {
      // Check stat cards
      expect(screen.getByText('5234')).toBeInTheDocument(); // Total Users
      expect(screen.getByText('456')).toBeInTheDocument(); // New Users
      expect(screen.getByText('342')).toBeInTheDocument(); // Upcoming Trips
      expect(screen.getByText('1245')).toBeInTheDocument(); // Past Trips
    });
  });

  test('renders popular months bar chart', async () => {
    renderComponent();

    await waitFor(() => {
      // Verify Bar chart is rendered with correct data
      expect(Bar).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            labels: expect.arrayContaining(['January', 'December']),
            datasets: expect.arrayContaining([
              expect.objectContaining({
                data: expect.arrayContaining([210, 320])
              })
            ])
          })
        }),
        {}
      );
    });
  });

  test('renders popular destinations table', async () => {
    renderComponent();

    await waitFor(() => {
      // Check destinations table headers
      expect(screen.getByText('City')).toBeInTheDocument();
      expect(screen.getByText('Trips')).toBeInTheDocument();

      // Check destination data
      expect(screen.getByText('France')).toBeInTheDocument();
      expect(screen.getByText('842')).toBeInTheDocument();
      expect(screen.getByText('Japan')).toBeInTheDocument();
      expect(screen.getByText('723')).toBeInTheDocument();
    });
  });

  test('renders world map', async () => {
    renderComponent();

    await waitFor(() => {
      // Verify WorldMap is rendered
      expect(WorldMap).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "teal",
          "value-suffix": "people",
          size: "lg",
          tooltipBgColor: "teal"
        }),
        {}
      );
    });
  });

  test('handles server error', async () => {
    // Simulate server error
    backend.getUserStatistics.mockRejectedValue({
      response: { status: 500 }
    });

    renderComponent();

    await waitFor(() => {
      // Verify error message was set for server error
      expect(mockSetErrorMessage).toHaveBeenCalledWith(
        "Service unavailable. Please try again later."
      );
    });
  });

  test('handles network error', async () => {
    // Simulate network error
    backend.getUserStatistics.mockRejectedValue({});

    renderComponent();

    await waitFor(() => {
      // Verify error message was set for network error
      expect(mockSetErrorMessage).toHaveBeenCalledWith(
        "Error: Could not connect to the server."
      );
    });
  });
});