import { RequestHandler as Middleware } from 'express';

export const requestLoggerMiddleware: Middleware = (req, res, next) => {
    console.log(`Got ${req.method} request: ${req.path}`)
    next();
    console.log(`Finished ${req.method} request: ${req.path}`)
  };