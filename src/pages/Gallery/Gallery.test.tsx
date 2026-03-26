import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Gallery } from './Gallery';

vi.mock('./useGalleryImages', () => ({
  useGalleryImages: () => ({ images: [], isLoading: false }),
}));

describe('Gallery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

    await waitFor(() => {
      const empty = container.querySelector('.gallery-empty');
      expect(empty).toBeInTheDocument();
    });

    unmount();
  });
});
