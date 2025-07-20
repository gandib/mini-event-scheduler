import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TEvent } from './Event.interface';
import { isValidDate, isValidTime } from './Event.utils';

// To save Event
const events: TEvent[] = [];
let eventId: number = events.length + 1;

const addEvent = async (payload: TEvent): Promise<TEvent> => {
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

  // Set id
  payload.id = eventId++;

  // Add category
  payload.category = 'Personal';

  // Set archived status
  payload.archivedStatus = false;

  // Create Event
  events.push(payload);

  return payload;
};

const getAllEvents = async (): Promise<TEvent[]> => {
  return events;
};

export const evnetServices = {
  addEvent,
  getAllEvents,
};
