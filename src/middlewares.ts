/* eslint-disable import/prefer-default-export */
// import { Request, Response, NextFunction } from 'express';
// import { ZodError } from 'zod';

// import RequestValidators from './interfaces/RequestValidators';

// export function validateRequest(validators: RequestValidators) {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       if (validators.params) {
//         req.params = await validators.params.parseAsync(req.params);
//       }
//       if (validators.body) {
//         req.body = await validators.body.parseAsync(req.body);
//       }
//       if (validators.query) {
//         req.query = await validators.query.parseAsync(req.query);
//       }
//       next();
//     } catch (error) {
//       if (error instanceof ZodError) {
//         console.log('res.status');
//         res.status(422);
//         next(error);
//       }
//       next(error);
//     }
//   };
// }

// export function notFound(req: Request, res: Response, next: NextFunction) {
//   res.status(404);
//   const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
//   next(error);
// }

// export function errorHandler(
//   err: Error,
//   _: Request,
//   res: Response<ErrorResponse>,
//   next: NextFunction
// ) {
//   const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

//   res.status(statusCode).json({
//     message: err.message,
//     stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
//   });
//   next();
// }
