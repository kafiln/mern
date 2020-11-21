import { Request, Response } from 'express';
import { SESSION_NAME } from '../config';

export const logIn = (req: Request, userId: string): void => {
	(req.session as any).userId = userId;
};
export const logOut = (req: Request, res: Response): Promise<void> => {
	return new Promise((resolve, reject) => {
		req.session!.destroy((err: Error) => {
			if (err) reject(err);
			res.clearCookie(SESSION_NAME);
			resolve();
		});
	});
};

export const isLoggedIn = (req: Request): boolean =>
	!!(req.session as any).userId;
