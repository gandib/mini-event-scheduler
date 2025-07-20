export function isValidDate(value: string): boolean {
  // Strict regex check for format YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) return false;

  const date = new Date(value);
  const [year, month, day] = value.split('-').map(Number);

  // Check date validity
  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
}

export function isValidTime(value: string): boolean {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(value);
}

export const categorizeEvent = (
  title: string,
  notes?: string,
): 'Work' | 'Personal' | 'Other' => {
  const workKeywords = ['meeting', 'project', 'client', 'deadline'];
  const personalKeywords = ['birthday', 'family', 'anniversary', 'party'];
  const combinedText = `${title} ${notes || ''}`.toLowerCase();

  if (workKeywords.some((keyword) => combinedText.includes(keyword))) {
    return 'Work';
  }

  if (personalKeywords.some((keyword) => combinedText.includes(keyword))) {
    return 'Personal';
  }

  return 'Other';
};
