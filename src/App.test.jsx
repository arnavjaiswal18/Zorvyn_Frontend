import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Smoke Test', () => {
  it('renders without crashing', () => {
    // This is a basic test to ensure the app components can be rendered in jsdom
    // We're just checking that the main container or some expected element is present
    render(<App />);
    
    // Check if the main container or a specific text is present
    // Adjust this based on what App.jsx actually renders
    const mainElement = document.querySelector('div');
    expect(mainElement).toBeInTheDocument();
  });
});
