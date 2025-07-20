/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { TErrorMessages } from '../interface/error';
import config from '../config';
import AppError from '../errors/appError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // SETTING DEFAULT VALUES
  const statusCode = 500;
  const message = 'Something went wrong!';
  const errorMessages: TErrorMessages = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  if (error instanceof AppError) {
    return res.status(statusCode).json({
      success: false,
      statusCode: error?.statusCode,
      message: error?.message,
      data: [],
    });
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;
