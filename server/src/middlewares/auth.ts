import { NextFunction, Request, Response } from 'express';
import { ALREADY_LOGGED_IN, NOT_AUTHENTICATED } from '../constants';
import { UnAuthorized } from '../errors';
import { isLoggedIn } from '../helpers';

export const guest = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	if (isLoggedIn(req)) {
		return next(new UnAuthorized(ALREADY_LOGGED_IN));
	}
	next();
};

export const authenticated = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	if (!isLoggedIn(req)) {
		return next(new UnAuthorized(NOT_AUTHENTICATED));
	}
	next();
};
