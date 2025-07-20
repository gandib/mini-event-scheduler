import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TEvent } from './Event.interface';
import { isValidDate, isValidTime } from './Event.utils';

// To save Event
const events: TEvent[] = [];
let id: number = events.length + 1;

const addEvent = async (payload: TEvent) => {
  if (!payload.title) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Title can not be empty.');
  }

  // Validate Date
  if (!payload.date || !isValidDate(payload.date)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid or missing date. Please select a valid date.',
    );
  }

  // Validate Time
  if (!payload.time || !isValidTime(payload.time)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid or missing time. Use HH:MM format (24-hour).',
    );
  }

  // Add category
  payload.category = 'Personal';

  // Set archived status
  payload.archivedStatus = false;

  // Create Event
  const event = { id: id++, ...payload };
  events.push(event);

  return event;
};

export const evnetServices = {
  addEvent,
};
