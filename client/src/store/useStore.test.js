import { describe, it, expect, beforeEach } from 'vitest';
import useStore from './useStore';

describe('Zustand Store', () => {
  beforeEach(() => {
    useStore.getState().resetSimulation();
  });

  it('initializes with default state', () => {
    const state = useStore.getState();
    expect(state.currentStep).toBe(0);
    expect(state.userData.voterId).toBe('');
  });

  it('updates user data correctly', () => {
    const { updateUserData } = useStore.getState();
    updateUserData({ voterId: 'V123' });
    expect(useStore.getState().userData.voterId).toBe('V123');
  });

  it('navigates steps', () => {
    const { nextStep, prevStep } = useStore.getState();
    nextStep();
    expect(useStore.getState().currentStep).toBe(1);
    prevStep();
    expect(useStore.getState().currentStep).toBe(0);
  });
});
