import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Simulation from './Simulation';
import useStore from '../store/useStore';

vi.mock('../store/useStore');

describe('Simulation Page', () => {
  beforeEach(() => {
    vi.mocked(useStore).mockReturnValue({
      currentStep: 0,
      nextStep: vi.fn(),
      prevStep: vi.fn(),
      fetchInsight: vi.fn(),
      insight: 'Test Insight',
      isLoading: false,
      resetSimulation: vi.fn(),
      userData: { voterId: '', boothId: null },
      explainError: vi.fn(),
      aiExplanation: null,
      config: { candidates: [] }
    });
  });

  it('renders the stepper and initial step', () => {
    render(<Simulation />);
    expect(screen.getByText(/1/)).toBeInTheDocument();
    expect(screen.getByText(/Educational Insight/i)).toBeInTheDocument();
  });
});
