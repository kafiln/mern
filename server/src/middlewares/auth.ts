import { NextFunction, Request, Response } from 'express';
import { Authorized } from '../errors';
import { isLoggedIn } from '../helpers';

export const guest = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	if (isLoggedIn(req)) {
		return next(new Authorized('Already logged in'));
	}
	next();
};

export const authenticated = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	if (!isLoggedIn(req)) {
		return next(new Authorized('You are not authenticated'));
	}
	next();
};
