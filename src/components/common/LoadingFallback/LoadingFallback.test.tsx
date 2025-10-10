import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { LoadingFallback } from './LoadingFallback';

describe('LoadingFallback', () => {
  it('should render loading spinner', () => {
    render(<LoadingFallback />);

    const spinner = screen.getByRole('status', { hidden: true });
    expect(spinner).toBeInTheDocument();
  });

  it('should display loading text', () => {
    render(<LoadingFallback />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should have correct CSS classes', () => {
    const { container } = render(<LoadingFallback />);

    const loadingDiv = container.firstChild;
    expect(loadingDiv).toHaveClass('loading-fallback');

    const spinner = container.querySelector('.loading-spinner');
    expect(spinner).toBeInTheDocument();

    const text = container.querySelector('.loading-text');
    expect(text).toBeInTheDocument();
  });
});
