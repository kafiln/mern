import { Request, Response, Router } from 'express';
import { Authorized, BadRequest } from '../../../errors';
import { asyncHandler, logIn, logOut, validateSchema } from '../../../helpers';
import { authenticated, guest } from '../../../middlewares';
import { UserModel } from '../../../models/User';
import { loginInput, registerInput } from '../../../validation';

const router = Router();

export const login = async (req: Request, res: Response): Promise<void> => {
	await validateSchema(loginInput, req.body);

	const { email, password } = req.body;
	const user = await UserModel.findOne({ email });

	if (!user || !(await user.compare(password))) {
		throw new Authorized('Invalid credentials');
	}

	logIn(req, user.id);

	res.json({ message: 'OK' });
};

export const register = async (req: Request, res: Response): Promise<void> => {
	await validateSchema(registerInput, req.body);

	const { email } = req.body;
	const exists = await UserModel.findOne({ email });

	if (exists) {
		throw new BadRequest('User already exists');
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
router.post('/register', guest, asyncHandler(register));

// POST /auth/login
router.post('/login', guest, asyncHandler(login));

// POST /auth/logout
router.post('/logout', authenticated, asyncHandler(logout));

export default router;
