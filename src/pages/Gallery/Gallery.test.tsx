import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Gallery } from './Gallery';

// Mock import.meta.glob to return empty object
vi.mock('/@fs', () => ({}));

describe('Gallery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render gallery title', async () => {
    const { unmount } = render(<Gallery />);

    expect(
      screen.getByRole('heading', { name: /photo gallery/i })
    ).toBeInTheDocument();

    // Wait for any async operations and cleanup
    await waitFor(() => {
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    unmount();
  });

  it('should render gallery subtitle', async () => {
    const { unmount } = render(<Gallery />);

    expect(
      screen.getByText(/a modern masonry layout showcasing/i)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(/a modern masonry layout showcasing/i)
      ).toBeInTheDocument();
    });

    unmount();
  });

  it('should show empty state when no images are found', async () => {
    const { unmount } = render(<Gallery />);

    await waitFor(() => {
      expect(
        screen.getByText(
          /no images found. add images to src\/assets\/pictures/i
        )
      ).toBeInTheDocument();
    });

    unmount();
  });

  it('should have correct CSS structure', async () => {
    const { container, unmount } = render(<Gallery />);

    const gallery = container.querySelector('.gallery');
    expect(gallery).toBeInTheDocument();

    const header = container.querySelector('.gallery-header');
    expect(header).toBeInTheDocument();

    await waitFor(() => {
      const empty = container.querySelector('.gallery-empty');
      expect(empty).toBeInTheDocument();
    });

    unmount();
  });
});
