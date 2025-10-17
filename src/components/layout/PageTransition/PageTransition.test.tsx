import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import PageTransitionProvider, { usePageTransition } from './PageTransition';

function Consumer() {
  const { runTransition } = usePageTransition();
  return <button onClick={() => runTransition('ltr', () => {})}>run</button>;
}

describe('PageTransition', () => {
  it('renders overlay and can run transition', async () => {
    render(
      <PageTransitionProvider>
        <Consumer />
      </PageTransitionProvider>
    );

    const btn = screen.getByRole('button', { name: 'run' });
    await act(async () => {
      btn.click();
    });

    // overlay element exists
    const overlay = document.querySelector('.page-transition-overlay');
    expect(overlay).toBeTruthy();
  });
});
