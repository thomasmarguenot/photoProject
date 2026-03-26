import { render } from '@testing-library/react';
import { beforeAll, describe, it, expect } from 'vitest';

import { Home } from './Home';

beforeAll(() => {
  // Framer Motion's whileInView requires IntersectionObserver
  globalThis.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe('Home', () => {
  it('should render with correct CSS structure', () => {
    const { container } = render(<Home />);

    const homeDiv = container.querySelector('.home');
    expect(homeDiv).toBeInTheDocument();
  });

  it('should render hero and clients wrapper', () => {
    const { container } = render(<Home />);

    const wrapper = container.querySelector('.home-hero-clients');
    expect(wrapper).toBeInTheDocument();
  });
});
