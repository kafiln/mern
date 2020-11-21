export * from './auth';
export * from './validation';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export const asyncHandler = (handler: RequestHandler) => (
	req: Request,
	res: Response,
	next: NextFunction,
): RequestHandler => handler(req, res, next).catch(next);
