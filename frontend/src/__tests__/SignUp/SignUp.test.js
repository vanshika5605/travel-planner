import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUp from '../../components/SignUp/SignUp';
import backend from '../../components/Utils/backend';

// Mock dependencies
jest.mock('../../components/Utils/backend');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('SignUp Component', () => {
  const mockProps = {
    setUserId: jest.fn(),
    setUserData: jest.fn(),
    setIsLoggedIn: jest.fn()
  };

  const validFormData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    location: 'New York',
    gender: 'Male',
    defaultCurrency: 'USD',
    password: 'StrongPass123!',
    confirmPassword: 'StrongPass123!'
  };

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <SignUp {...mockProps} />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders signup form with all input fields', () => {
    renderComponent();

    // Check main heading
    expect(screen.getByText('Start Your Journey!')).toBeInTheDocument();

    // Check input fields
    const inputFields = [
      'Name', 'Email', 'Location', 
      'DefaultCurrency'
    ];

    inputFields.forEach(field => {
      const label = screen.getByLabelText(new RegExp(field, 'i'));
      expect(label).toBeInTheDocument();
    });

    // Check gender radio buttons and their labels
    ['Male', 'Female', 'Other'].forEach(gender => {
      const radioButton = screen.getByLabelText(gender);
      expect(radioButton).toBeInTheDocument();
      expect(radioButton).toHaveAttribute('type', 'radio');
    });
  });

  // ... rest of the tests remain the same
});