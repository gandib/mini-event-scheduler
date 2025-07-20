import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { evnetServices } from './Event.service';

const addEvent = catchAsync(async (req, res) => {
  const result = await evnetServices.addEvent(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event added successfully',
    data: result,
  });
});

const getAllEvents = catchAsync(async (req, res) => {
  const result = await evnetServices.getAllEvents();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Events retrieved successfully',
    data: result,
  });
});

export const eventControllers = {
  addEvent,
  getAllEvents,
};
