/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, RequestHandler } from 'express';

const notFoundErrorHandler: RequestHandler = (req, res, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Api Not Found',
    error: '',
  });
};

export default notFoundErrorHandler;
