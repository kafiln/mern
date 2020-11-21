/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { HttpError, NotFound } from '../errors';

export const internalServerError = (
	err: HttpError,
	req: Request,
	res: Response,
	next: NextFunction,
): Response<unknown> =>
	res.status(err.status || 500).send(err.message || 'Internal server error');

export const notFound = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => next(new NotFound());
