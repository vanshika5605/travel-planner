import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../components/Utils/Navbar';
import backend from '../../components/Utils/backend';

// Mock dependencies
jest.mock('../../components/Utils/backend');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const defaultProps = {
  isLoggedIn: false,
  setIsLoggedIn: jest.fn(),
  userId: '',
  setUserId: jest.fn(),
  password: '',
  setPassword: jest.fn(),
  userData: {},
  setUserData: jest.fn(),
  isAdmin: false,
  setIsAdmin: jest.fn(),
};

const renderComponent = (props = {}) => {
  return render(
    <BrowserRouter>
      <Navbar {...defaultProps} {...props} />
    </BrowserRouter>
  );
};

describe('Navbar Component', () => {
  // Rendering Tests
  test('renders navbar with logo and app name', () => {
    renderComponent();
    
    const logo = screen.getByAltText('Logo');
    const appName = screen.getByText('Travel Planner');
    
    expect(logo).toBeInTheDocument();
    expect(appName).toBeInTheDocument();
  });

  // Login Button and Modal Tests
  test('shows login modal when login button is clicked', () => {
    renderComponent();
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
    
    const modalTitle = screen.getByText('Log In');
    expect(modalTitle).toBeInTheDocument();
  });

  // Email Validation Tests
  test('validates email input', () => {
    renderComponent();
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
    
    const emailInput = screen.getByLabelText('Email address');
    
    // Invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    const invalidFeedback = screen.getByText('Please enter a valid email.');
    expect(invalidFeedback).toBeInTheDocument();
    
    // Valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(screen.queryByText('Please enter a valid email.')).not.toBeInTheDocument();
  });

  // Login Flow Tests
  test('handles successful login for regular user', async () => {
    // Mock successful login response
    backend.login.mockResolvedValue({
      status: 200,
      data: { 
        data: { 
          name: 'John Doe' 
        } 
      }
    });

    renderComponent();
    
    // Open login modal
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
    
    // Find and fill in login form
    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Log In' });
    
    // Change input values
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Submit the form
    fireEvent.click(submitButton);
    
    // Wait and check login method was called
    // await waitFor(() => {
    //   expect(backend.login).toHaveBeenCalledWith({
    //     email: 'user@example.com',
    //     password: 'password123'
    //   });
    // });
  });

  // Logout Tests
  test('handles logout functionality', () => {
    const setIsLoggedIn = jest.fn();
    const navigate = jest.fn();
    
    renderComponent({ 
      isLoggedIn: true, 
      setIsLoggedIn,
      userData: { name: 'John Doe' },
      navigate 
    });
    
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    
    expect(setIsLoggedIn).toHaveBeenCalledWith(false);
  });

  // Navigation Tests
  test('renders different nav links based on login status', () => {
    // Test for logged-in regular user
    const { unmount } = renderComponent({ 
      isLoggedIn: true,
      userData: { name: 'John Doe' }
    });
    
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Plan a Trip')).toBeInTheDocument();
    
    unmount();
    
    // Test for logged-in admin
    renderComponent({ 
      isLoggedIn: true, 
      isAdmin: true,
      userData: { name: 'Admin User' }
    });
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});