import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../../components/Profile/Profile';
import backend from '../../components/Utils/backend';

// Mock react-router-dom navigation
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
}));

// Mock backend calls
jest.mock('../../components/Utils/backend', () => ({
  getTrips: jest.fn(),
  generatePackingList: jest.fn(),
  getTripDetails: jest.fn(),
  getPackingList: jest.fn(),
}));

const mockUserData = {
  name: 'John Doe',
  email: 'john@example.com',
  gender: 'Male',
  location: 'New York',
  defaultCurrency: 'USD',
  id: '123'
};

const mockProps = {
  userData: mockUserData,
  setErrorMessage: jest.fn()
};

const mockTrips = {
  onGoingTrips: [
    {
      id: 'trip1',
      tripId: 'trip1',
      destination: 'Paris',
      startDate: '2023-07-01',
      endDate: '2023-07-10',
      isPackingListCreated: false
    }
  ],
  todayActivities: [
    {
      category: 'Travel',
      activity: 'Eiffel Tower Visit'
    },
    {
      category: 'Food',
      activity: 'French Cuisine Tasting'
    }
  ]
};

describe('Profile Component', () => {
  // Setup mock implementations before each test
  beforeEach(() => {
    backend.getTrips.mockResolvedValue({ 
      data: { 
        data: mockTrips 
      } 
    });
    backend.generatePackingList.mockResolvedValue({ 
      data: { 
        packingList: ['Item 1', 'Item 2'] 
      } 
    });
    backend.getTripDetails.mockResolvedValue({ 
      data: { 
        data: { 
          tripDetails: {} 
        } 
      } 
    });
  });

  // Profile Information Tests
  describe('Profile Information Display', () => {
    test('renders user profile details correctly', async () => {
      render(
        <MemoryRouter>
          <Profile {...mockProps} />
        </MemoryRouter>
      );
      
    });
  });

  // Ongoing Trips Tests
  describe('Ongoing Trips Functionality', () => {
    test('renders ongoing trips correctly', async () => {
      render(
        <MemoryRouter>
          <Profile {...mockProps} />
        </MemoryRouter>
      );
      
      // Wait for trips to load
      await waitFor(() => {
        expect(screen.getByText('📍 Trip to Paris')).toBeInTheDocument();
        expect(screen.getByText('Eiffel Tower Visit')).toBeInTheDocument();
        expect(screen.getByText('French Cuisine Tasting')).toBeInTheDocument();
      });
    });

    test('generates packing list when button is clicked', async () => {
      render(
        <MemoryRouter>
          <Profile {...mockProps} />
        </MemoryRouter>
      );
      
      // Wait for trips to load
      await waitFor(() => {
        const packingListButton = screen.getByText('Generate Packing List');
        fireEvent.click(packingListButton);
      });

      // Verify navigation and backend call
      await waitFor(() => {
        expect(backend.generatePackingList).toHaveBeenCalled();
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          expect.stringContaining('/packing-list/'),
          expect.any(Object)
        );
      });
    });

    test('views itinerary when button is clicked', async () => {
      render(
        <MemoryRouter>
          <Profile {...mockProps} />
        </MemoryRouter>
      );
      
      // Wait for trips to load
      await waitFor(() => {
        const viewItineraryButton = screen.getByText('View Itinerary');
        fireEvent.click(viewItineraryButton);
      });

      // Verify navigation and backend call
      await waitFor(() => {
        expect(backend.getTripDetails).toHaveBeenCalled();
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          '/itinerary',
          expect.any(Object)
        );
      });
    });
  });

  // Travel Statistics Tests
  describe('Travel Statistics', () => {
    test('renders travel statistics correctly', async () => {
      render(
        <MemoryRouter>
          <Profile {...mockProps} />
        </MemoryRouter>
      );
      
      // Check travel statistics
      expect(screen.getByText('12')).toBeInTheDocument(); // Countries Visited
      expect(screen.getByText('25')).toBeInTheDocument(); // Cities Visited
      expect(screen.getByText('12000 miles')).toBeInTheDocument(); // Total Distance
      expect(screen.getByText('20')).toBeInTheDocument(); // Flights Taken
    });
  });

  // Error Handling Tests
  describe('Error Handling', () => {
    test('handles no ongoing trips scenario', async () => {
      // Mock empty trips
      backend.getTrips.mockResolvedValue({ 
        data: { 
          data: { onGoingTrips: [] } 
        } 
      });

      render(
        <MemoryRouter>
          <Profile {...mockProps} />
        </MemoryRouter>
      );
      
      // Wait for trips to load
      await waitFor(() => {
        expect(screen.getByText('No ongoing trips.')).toBeInTheDocument();
      });
    });
  });
});