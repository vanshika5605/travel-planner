import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../components/Home/Home'; // Adjust the import path as needed

// Mock child components to isolate the Home component
jest.mock('../components/Home/Features', () => {
  return function DummyFeatures() {
    return <div data-testid="features-component">Mocked Features</div>;
  };
});

jest.mock('../components/Home/ContactUs', () => {
  return function DummyContactUs() {
    return <div data-testid="contact-us-component">Mocked Contact Us</div>;
  };
});

describe('Home Component', () => {
  // Render tests
  describe('Rendering', () => {
    beforeEach(() => {
      render(<Home />);
    });

    test('renders the main container', () => {
      const homeContainer = screen.getByTestId('home-container');
      expect(homeContainer).toBeInTheDocument();
      expect(homeContainer).toHaveClass('home-container');
    });

    test('renders the header section', () => {
      const headerSection = document.querySelector('.header-section');
      expect(headerSection).toBeInTheDocument();
    });

    test('displays the main headline', () => {
      const headline = screen.getByText('Discover Your Next Adventure');
      expect(headline).toBeInTheDocument();
    });

    test('renders the welcome paragraph', () => {
      const welcomeText = screen.getByText(/Welcome to your next adventure!/i);
      expect(welcomeText).toBeInTheDocument();
    });

    test('displays the Get Started button', () => {
      const getStartedButton = screen.getByRole('button', { name: /get started/i });
      expect(getStartedButton).toBeInTheDocument();
      expect(getStartedButton).toHaveClass('custom-get-started-btn');
    });

    test('renders home page image', () => {
      const homeImage = screen.getByAltText('Loading...');
      expect(homeImage).toBeInTheDocument();
      expect(homeImage).toHaveClass('home-page-img');
      expect(homeImage).toHaveAttribute('src', '/images/home.png');
    });
  });

  // Child Component Rendering
  describe('Child Components', () => {
    test('renders Features component', () => {
      render(<Home />);
      const featuresComponent = screen.getByTestId('features-component');
      expect(featuresComponent).toBeInTheDocument();
    });

    test('renders ContactUs component', () => {
      render(<Home />);
      const contactUsComponent = screen.getByTestId('contact-us-component');
      expect(contactUsComponent).toBeInTheDocument();
    });
  });

//   // Snapshot Testing
//   describe('Snapshot', () => {
//     test('matches snapshot', () => {
//       const { asFragment } = render(<Home />);
//       expect(asFragment()).toMatchSnapshot();
//     });
//   });
});