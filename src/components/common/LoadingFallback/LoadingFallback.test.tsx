import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { LoadingFallback } from './LoadingFallback';

describe('LoadingFallback', () => {
  it('should render loading spinner', () => {
    render(<LoadingFallback />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('should have correct CSS classes', () => {
    const { container } = render(<LoadingFallback />);

    const loadingDiv = container.firstChild;
    expect(loadingDiv).toHaveClass('loading-fallback');

    const cube = container.querySelector('.loading-cube');
    expect(cube).toBeInTheDocument();
  });
});
