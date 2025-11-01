import { describe, expect, it } from 'vitest';
import { generateCoverLetter } from '@/services/generateCoverLetter';

vi.useFakeTimers();

describe('generateCoverLetter', () => {
  it('fills the template with provided values', async () => {
    const promise = generateCoverLetter({
      company: 'Acme',
      jobTitle: 'Designer',
      skills: 'UX, UI',
      additionalDetails: 'I redesigned dashboards.'
    });

    await vi.runAllTimersAsync();

    await expect(promise).resolves.toContain('Dear Acme Team');
  });
});
