import { RequestHandler as Middleware } from 'express';

export const requestErrorHandlingMiddleware: Middleware = async (req, res, next) => {
  try {
    // todo
    console.log("middleware 1")
    await next()
    console.log("middleware 2")
  }
  catch (e){
    console.log("middleware catch")
    res.status(500).json({
      error: e
    })

  }
};