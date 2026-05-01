import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Landing from './Landing';

describe('Landing Component', () => {
  it('renders the landing page content', () => {
    render(<Landing onStart={() => {}} />);
    expect(screen.getByText(/VoteSmart/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Simulation/i)).toBeInTheDocument();
  });

  it('calls onStart when start button is clicked', () => {
    const onStart = vi.fn();
    render(<Landing onStart={onStart} />);
    const button = screen.getByText(/Start Simulation/i);
    fireEvent.click(button);
    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
