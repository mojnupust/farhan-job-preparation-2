import { describe, expect, it } from 'vitest';

import { ConflictError } from '../../../../shared/errors/http-errors.js';
import { assertTransition, canTransition } from '../transitions.js';

describe('withdrawal transitions', () => {
  it('allows REQUESTED → APPROVED or REJECTED', () => {
    expect(canTransition('REQUESTED', 'APPROVED')).toBe(true);
    expect(canTransition('REQUESTED', 'REJECTED')).toBe(true);
    expect(canTransition('REQUESTED', 'PAID')).toBe(false);
  });

  it('allows APPROVED → PAID or REJECTED', () => {
    expect(canTransition('APPROVED', 'PAID')).toBe(true);
    expect(canTransition('APPROVED', 'REJECTED')).toBe(true);
    expect(canTransition('APPROVED', 'REQUESTED')).toBe(false);
  });

  it('forbids leaving PAID or REJECTED', () => {
    expect(canTransition('PAID', 'REJECTED')).toBe(false);
    expect(canTransition('REJECTED', 'APPROVED')).toBe(false);
  });

  it('throws ConflictError on an illegal transition', () => {
    expect(() => assertTransition('PAID', 'APPROVED')).toThrow(ConflictError);
  });
});
