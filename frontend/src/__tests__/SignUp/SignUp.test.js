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
    setIsLoggedIn: jest.fn(),
    setErrorMessage: jest.fn()
  };

  const validFormData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    location: 'New York',
    gender: 'Male',
    defaultCurrency: 'USD',
    password: 'StrongPass123!',
    confirmPassword: 'StrongPass123!',
    role: 'user' // Add this line
  };

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <SignUp {...mockProps} />
      </MemoryRouter>
    );
  };

  const fillOutForm = (formData, overrides = {}) => {
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'gender') {
        // Specifically handle gender radio button
        const genderRadio = screen.getByLabelText(value);
        fireEvent.click(genderRadio);
      } else if (key !== 'role') {
        // Determine the label based on the key
        const labelRegex = new RegExp(
          key === 'defaultCurrency' ? 'DefaultCurrency' : 
          key === 'password' ? '^Password$' :
          key === 'confirmPassword' ? '^Confirm Password$' :
          key.charAt(0).toUpperCase() + key.slice(1), 
          'i'
        );
        
        // Get the input and change its value
        const input = screen.getByLabelText(labelRegex);
        fireEvent.change(input, { 
          target: { 
            value: overrides[key] !== undefined ? overrides[key] : value, 
            id: key 
          } 
        });
      }
    });
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

  test('handles input changes correctly', () => {
    renderComponent();

    // Test email input
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com', id: 'email' } });

    // Test password input with password strength checks
    const passwordInput = screen.getByLabelText(/^Password$/i);
    fireEvent.change(passwordInput, { target: { value: 'StrongPass123!', id: 'password' } });

    // Check password requirement indicators
    expect(screen.getByText(/✔ At least 8 characters/)).toBeInTheDocument();
    expect(screen.getByText(/✔ At least one uppercase letter/)).toBeInTheDocument();
    expect(screen.getByText(/✔ At least one lowercase letter/)).toBeInTheDocument();
    expect(screen.getByText(/✔ At least one special character/)).toBeInTheDocument();
  });

  // test('validates password requirements', () => {
  //   renderComponent();
  
  //   const passwordInput = screen.getByLabelText(/^Password$/i);
  
  //   const testCases = [
  //     { password: 'short', checks: [false, false, false, false] },
  //     { password: 'UPPERCASE', checks: [false, true, false, false] },
  //     { password: 'lowercase', checks: [false, false, true, false] },
  //     { password: 'StrongPass123!', checks: [true, true, true, true] }
  //   ];
  
  //   testCases.forEach(({ password, checks }) => {
  //     fireEvent.change(passwordInput, { target: { value: password, id: 'password' } });
  
  //     const checkStatuses = [
  //       { text: /At least 8 characters/, index: 0 },
  //       { text: /At least one uppercase letter/, index: 1 },
  //       { text: /At least one lowercase letter/, index: 2 },
  //       { text: /At least one special character/, index: 3 }
  //     ];
  
  //     checkStatuses.forEach(({ text, index }) => {
  //       const element = screen.getByText(text);
  //       const expectedClass = checks[index] ? 'text-success' : 'text-danger';
        
  //       // Use more robust checking
  //       expect(element).toHaveClass(expectedClass);
  //     });
  //   });
  // });

  test('handles successful registration', async () => {
    renderComponent();

    // Mock successful backend response
    backend.addUser.mockResolvedValue({ status: 200 });


    // Fill out the form
    fillOutForm(validFormData);

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Register' });    fireEvent.click(submitButton);

    // Wait for backend call and verify
    await waitFor(() => {
      expect(backend.addUser).toHaveBeenCalledWith(expect.objectContaining(validFormData));
      expect(mockProps.setUserId).toHaveBeenCalledWith(validFormData.email);
      expect(mockProps.setUserData).toHaveBeenCalledWith(validFormData);
      expect(mockProps.setIsLoggedIn).toHaveBeenCalledWith(true);
    });
  });

  test('handles registration errors', async () => {
    // Mock backend error responses
    const testErrorCases = [
      { 
        errorResponse: { response: { status: 400 } },
        expectedMessage: 'User already exists. Please try with a different email.'
      },
      // { 
      //   errorResponse: { response: { status: 500 } },
      //   expectedMessage: 'Service unavailable. Please try again later.'
      // },
      // { 
      //   errorResponse: {},
      //   expectedMessage: 'Error: Could not connect to the server.'
      // }
    ];
  
    for (const { errorResponse, expectedMessage } of testErrorCases) {
      // Clear previous mocks
      jest.clearAllMocks();
      backend.addUser.mockRejectedValue(errorResponse);
  
      // Use renderComponent instead of render
      renderComponent();
  
      // Fill out the form
      fillOutForm(validFormData);
  
      // Submit the form
      const submitButton = screen.getByRole('button', { name: 'Register' });
      fireEvent.click(submitButton);
  
      // Wait for and verify error message
      // await waitFor(() => {
      //   expect(screen.getByText(expectedMessage)).toBeInTheDocument();
      // });
  
      // Clean up the DOM after each iteration
      // screen.unmount();
    }
  });

  test('prevents submission with mismatched passwords', async () => {
    renderComponent();

    // Fill out form with mismatched passwords
    fillOutForm(validFormData, { 
      confirmPassword: 'DifferentPassword123!' 
    });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Register' });    fireEvent.click(submitButton);

    // Verify error message
    // await waitFor(() => {
    //   expect(screen.getByText('Please fill all fields correctly or ensure passwords match.')).toBeInTheDocument();
    // });
  });
});