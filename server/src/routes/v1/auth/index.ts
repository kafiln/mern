import { Request, Response, Router } from 'express';
import { USER_ALREADY_EXISTS } from '../../../constants';
import { BadRequest, UnAuthorized } from '../../../errors';
import { asyncHandler, logIn, logOut } from '../../../helpers';
import { authenticated, guest } from '../../../middlewares';
import { validateSchema } from '../../../middlewares/validation';
import { UserModel } from '../../../models/User';
import { loginInput, registerInput } from '../../../validation';

const router = Router();

export const login = async (req: Request, res: Response): Promise<void> => {
	const { email, password } = req.body;
	const user = await UserModel.findOne({ email });

	if (!user || !(await user.compare(password))) {
		throw new UnAuthorized('Invalid credentials');
	}

	logIn(req, user.id);

	res.json({ message: 'OK' });
};

export const register = async (req: Request, res: Response): Promise<void> => {
	const { email } = req.body;
	const exists = await UserModel.findOne({ email });

	if (exists) {
		throw new BadRequest(USER_ALREADY_EXISTS);
	}

	const user = await UserModel.create(req.body);
	logIn(req, user.id);

	res.json({ message: 'OK' });
};

export const logout = async (req: Request, res: Response): Promise<void> => {
	await logOut(req, res);
	res.json({ message: 'OK' });
};

// POST /auth/register
router.post(
	'/register',
	guest,
	validateSchema(registerInput),
	asyncHandler(register),
);

// POST /auth/login
router.post('/login', guest, validateSchema(loginInput), asyncHandler(login));

// POST /auth/logout
router.post('/logout', authenticated, asyncHandler(logout));

export default router;
