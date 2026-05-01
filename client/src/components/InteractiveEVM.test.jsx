import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InteractiveEVM from './InteractiveEVM';

describe('InteractiveEVM Component', () => {
  const mockCandidates = [
    { id: 1, name: 'Candidate 1', symbol: '🍎', party: 'Party A' },
    { id: 2, name: 'Candidate 2', symbol: '🍌', party: 'Party B' }
  ];

  it('renders all candidates', () => {
    render(<InteractiveEVM candidates={mockCandidates} />);
    expect(screen.getByText('Candidate 1')).toBeInTheDocument();
    expect(screen.getByText('Candidate 2')).toBeInTheDocument();
  });

  it('calls onVote when a candidate is clicked', () => {
    const onVote = vi.fn();
    render(<InteractiveEVM candidates={mockCandidates} onVote={onVote} />);
    
    const voteButtons = screen.getAllByRole('button');
    fireEvent.click(voteButtons[0]);
    
    expect(onVote).toHaveBeenCalledWith(mockCandidates[0]);
    expect(screen.getByText(/Vote Recorded Successfully/i)).toBeInTheDocument();
  });
});
