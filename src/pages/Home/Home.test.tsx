import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Home } from './Home';

describe('Home', () => {
  it('should render main heading', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', { name: /welcome to photoproject/i })
    ).toBeInTheDocument();
  });

  it('should render subtitle', () => {
    render(<Home />);

    expect(
      screen.getByText(/a modern react application with typescript/i)
    ).toBeInTheDocument();
  });

  it('should render feature cards', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', { name: /fast development/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /styled with tailwind/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /type-safe/i })
    ).toBeInTheDocument();
  });

  it('should render feature descriptions', () => {
    render(<Home />);

    expect(
      screen.getByText(/built with vite for lightning-fast hmr/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/utility-first css with custom components/i)
    ).toBeInTheDocument();
  });

  it('should have correct CSS structure', () => {
    const { container } = render(<Home />);

    const homeDiv = container.querySelector('.home');
    expect(homeDiv).toBeInTheDocument();

    const heroSection = container.querySelector('.home-hero');
    expect(heroSection).toBeInTheDocument();

    const featuresSection = container.querySelector('.home-features');
    expect(featuresSection).toBeInTheDocument();

    const featureCards = container.querySelectorAll('.feature-card');
    expect(featureCards).toHaveLength(4);
  });
});
