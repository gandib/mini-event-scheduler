import { categorizeEvent } from './Event.utils';

describe('categorizeEvent', () => {
  it('should categorize as Work if work-related keywords exist in title', () => {
    expect(categorizeEvent('Team meeting tomorrow')).toBe('Work');
    expect(categorizeEvent('Client deadline reminder')).toBe('Work');
  });

  it('should categorize as Work if keywords exist in notes', () => {
    expect(categorizeEvent('Check updates', 'Project kickoff soon')).toBe(
      'Work',
    );
  });

  it('should categorize as Personal if personal keywords exist in title', () => {
    expect(categorizeEvent("Dad's birthday")).toBe('Personal');
    expect(categorizeEvent('Anniversary dinner')).toBe('Personal');
  });

  it('should categorize as Personal if keywords exist in notes', () => {
    expect(categorizeEvent('Plan something', 'Family reunion event')).toBe(
      'Personal',
    );
  });

  it('should categorize as Other when no known keywords are found', () => {
    expect(categorizeEvent('Go shopping', 'Buy groceries')).toBe('Other');
  });

  it('should handle empty notes gracefully', () => {
    expect(categorizeEvent('Lunch with friend')).toBe('Other');
  });

  it('should be case-insensitive', () => {
    expect(categorizeEvent('MEETING with client')).toBe('Work');
    expect(categorizeEvent('Birthday Celebration')).toBe('Personal');
  });
});
