import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Utils/Footer';

describe('Footer Component', () => {
  // Test case 1: Renders the Footer component correctly
  test('renders footer component', () => {
    render(<Footer />);
    
    // Check main footer element exists
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  // Test case 2: Verifies the main heading
  test('displays correct main heading', () => {
    render(<Footer />);
    
    const mainHeading = screen.getByText('Your travel buddy');
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading.tagName).toBe('H2');
  });

  // Test case 3: Checks location section content
  test('renders location section correctly', () => {
    render(<Footer />);
    
    const locationHeading = screen.getByText('Location');
    expect(locationHeading).toBeInTheDocument();
    expect(locationHeading.tagName).toBe('H3');

    const cityText = screen.getByText('Amherst');
    const stateText = screen.getByText('MA - 01002');
    expect(cityText).toBeInTheDocument();
    expect(stateText).toBeInTheDocument();
  });

  // Test case 4: Verifies contact section content
  test('renders contact section correctly', () => {
    render(<Footer />);
    
    const contactHeading = screen.getByText('Contact');
    expect(contactHeading).toBeInTheDocument();
    expect(contactHeading.tagName).toBe('H3');

    const emailLink = screen.getByText('contact@travelbuddy.com');
    const phoneNumber = screen.getByText('(123) 456-7890');
    
    expect(emailLink).toBeInTheDocument();
    expect(phoneNumber).toBeInTheDocument();
    
    // Check email link attributes
    expect(emailLink).toHaveAttribute('href', 'mailto:email@example.com');
  });

  // Test case 5: Checks footer structure
  test('footer has correct structure with left and right sections', () => {
    render(<Footer />);
    
    const footerLeftSection = screen.getByText('Your travel buddy').closest('div');
    const footerRightSection = screen.getByText('Location').closest('.footer-right');
    
    expect(footerLeftSection).toHaveClass('footer-left');
    expect(footerRightSection).toHaveClass('footer-right');
  });

  // Test case 6: Ensures no commented-out content is rendered
  test('does not render commented-out content', () => {
    render(<Footer />);
    
    const squarespaceLink = screen.queryByText('Squarespace');
    const demoStreetText = screen.queryByText('123 Demo Street');
    
    expect(squarespaceLink).not.toBeInTheDocument();
    expect(demoStreetText).not.toBeInTheDocument();
  });
});