import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../../components/Utils/Loader';

describe('Loader Component', () => {
  // Test case 1: Renders the Loader component correctly
  test('renders loader component', () => {
    render(<Loader />);
    
    // Check if loader container exists
    const loaderContainer = screen.getByTestId('loader-container');
    expect(loaderContainer).toBeInTheDocument();
  });

  // Test case 2: Verifies loader image
  test('displays loader image with correct attributes', () => {
    render(<Loader />);
    
    const loaderImage = screen.getByAltText('Loading...');
    
    expect(loaderImage).toBeInTheDocument();
    expect(loaderImage).toHaveAttribute('src', '/loader.gif');
    expect(loaderImage).toHaveAttribute('alt', 'Loading...');
  });

  // Test case 3: Checks loader container class
  test('has correct CSS class', () => {
    render(<Loader />);
    
    const loaderContainer = screen.getByTestId('loader-container');
    expect(loaderContainer).toHaveClass('loader-container');
  });

  // Test case 4: Ensures image is visible
  test('loader image is visible', () => {
    render(<Loader />);
    
    const loaderImage = screen.getByAltText('Loading...');
    expect(loaderImage).toBeVisible();
  });
});