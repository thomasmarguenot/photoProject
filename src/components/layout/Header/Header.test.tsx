import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import { Header } from './Header';

const renderWithRouter = (ui: ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Header', () => {
  it('should render with default title', () => {
    renderWithRouter(<Header />);

    const titles = screen.getAllByText('とーます・まるぐの');
    expect(titles.length).toBeGreaterThan(0);
  });

  it('should render with custom title', () => {
    renderWithRouter(<Header title="Custom Title" />);

    const titles = screen.getAllByText('Custom Title');
    expect(titles.length).toBeGreaterThan(0);
  });

  it('should render navigation links', () => {
    renderWithRouter(<Header />);

    const homeLink = screen.getByRole('link', { name: /accueil/i });
    const aboutLink = screen.getByRole('link', { name: /à propos/i });
    const contactLink = screen.getByRole('link', { name: /contact/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });

  it('should have correct href attributes', () => {
    renderWithRouter(<Header />);

    const homeLink = screen.getByRole('link', { name: /accueil/i });
    const aboutLink = screen.getByRole('link', { name: /à propos/i });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('should render header element', () => {
    const { container } = renderWithRouter(<Header />);

    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('header');
  });
});
