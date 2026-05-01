import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Landing from './Landing';

describe('Landing Snapshots', () => {
  it('matches the landing page snapshot', () => {
    const { asFragment } = render(<Landing onStart={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
