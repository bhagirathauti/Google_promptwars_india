import { describe, it, expect, vi, beforeEach } from 'vitest';
import useStore from '../store/useStore';

describe('End-to-End Simulation Workflow', () => {
  beforeEach(() => {
    useStore.getState().resetSimulation();
  });

  it('completes the entire voting journey successfully', async () => {
    const store = useStore.getState();
    
    // 1. Initial State
    expect(store.currentStep).toBe(0);

    // 2. Registration Step
    store.updateUserData({ voterId: 'VOTER123', name: 'John Doe', boothId: 'PB-001' });
    expect(store.userData.voterId).toBe('VOTER123');
    
    // 3. Move to Ink Marking
    store.nextStep();
    expect(useStore.getState().currentStep).toBe(1);

    // 4. Move to Polling Booth
    useStore.getState().nextStep();
    expect(useStore.getState().currentStep).toBe(2);

    // 5. Move to EVM
    useStore.getState().nextStep();
    expect(useStore.getState().currentStep).toBe(3);

    // 6. Cast Vote
    useStore.getState().updateUserData({ selectedCandidate: 1 });
    expect(useStore.getState().userData.selectedCandidate).toBe(1);

    // 7. Complete Simulation
    useStore.getState().nextStep();
    expect(useStore.getState().currentStep).toBe(4);
  });
});
