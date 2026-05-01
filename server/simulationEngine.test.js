import { describe, it, expect, vi, beforeEach } from 'vitest';
import SimulationEngine from './simulationEngine';
import fs from 'fs';

vi.mock('fs');

describe('SimulationEngine', () => {
  const mockConfig = {
    initialStep: 'start',
    steps: {
      'start': {
        id: 'start',
        title: 'Start',
        validation: [],
        next: { type: 'linear', target: 'next' }
      },
      'next': {
        id: 'next',
        title: 'Next',
        validation: [{ field: 'age', rule: 'min', value: 18, message: 'Too young' }],
        next: { type: 'end' }
      }
    }
  };

  beforeEach(() => {
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockConfig));
  });

  it('gets the initial step', () => {
    const engine = new SimulationEngine('dummy.json');
    expect(engine.getInitialStep()).toBe('start');
  });

  it('validates input correctly', () => {
    const engine = new SimulationEngine('dummy.json');
    const valid = engine.validateStep('next', { age: 20 });
    const invalid = engine.validateStep('next', { age: 16 });

    expect(valid.isValid).toBe(true);
    expect(invalid.isValid).toBe(false);
    expect(invalid.errors).toContain('Too young');
  });

  it('determines the next step', () => {
    const engine = new SimulationEngine('dummy.json');
    expect(engine.getNextStep('start', {})).toBe('next');
    expect(engine.getNextStep('next', {})).toBeNull();
  });
});
