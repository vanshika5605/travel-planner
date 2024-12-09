import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactUs from '../../components/Home/ContactUs';

// Mock window.location.href
const mockLocation = {
  href: '',
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('ContactUs Component', () => {
  beforeEach(() => {
    // Clear the mock location before each test
    mockLocation.href = '';
    render(<ContactUs />);
  });

  test('renders contact us heading', () => {
    const headingElement = screen.getByText(/Contact Us/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders description text', () => {
    const descriptionText = screen.getByText(/Interested in working together\?/i);
    expect(descriptionText).toBeInTheDocument();
  });

  test('renders input fields', () => {
    // First Name input
    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    expect(firstNameInput).toBeInTheDocument();
    expect(firstNameInput).toHaveAttribute('type', 'text');
    expect(firstNameInput).toHaveAttribute('required');

    // Last Name input
    const lastNameInput = screen.getByPlaceholderText(/Last Name/i);
    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameInput).toHaveAttribute('type', 'text');
    expect(lastNameInput).toHaveAttribute('required');

    // Email input
    const emailInput = screen.getByPlaceholderText(/Email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('required');

    // Message textarea
    const messageInput = screen.getByPlaceholderText(/Your Message/i);
    expect(messageInput).toBeInTheDocument();
    expect(messageInput.tagName).toBe('TEXTAREA');
    expect(messageInput).toHaveAttribute('required');
  });

  test('renders Get in touch button', () => {
    const buttonElement = screen.getByText(/Get in touch/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  test('handles get in touch click with mailto link', () => {
    const buttonElement = screen.getByText(/Get in touch/i);
    
    fireEvent.click(buttonElement);
    
    expect(window.location.href).toContain('mailto:example@example.com');
    expect(window.location.href).toContain('subject=Inquiry');
    expect(window.location.href).toContain('body=Hi%2C%20I%20want%20to%20get%20in%20touch.');
  });

  test('form inputs can be filled', () => {
    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    const lastNameInput = screen.getByPlaceholderText(/Last Name/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const messageInput = screen.getByPlaceholderText(/Your Message/i);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'This is a test message' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(messageInput.value).toBe('This is a test message');
  });
});