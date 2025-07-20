export type TEvent = {
  title: string;
  date: Date;
  time: string;
  notes?: string;
  category: 'Work' | 'Personal' | 'Other';
};
