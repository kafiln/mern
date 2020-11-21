import { Request, Response, Router } from 'express';
import { asyncHandler } from '../../../helpers';
import { authenticated } from '../../../middlewares';
import { UserModel } from '../../../models';

const router = Router();

router.get(
	'/',
	authenticated,
	asyncHandler(async (req: Request, res: Response) => {
		// const userId = req.session?.userId;
		const users = await UserModel.find();
		res.json(users);
	}),
);
router.delete(
	'/',
	authenticated,
	asyncHandler(async (req: Request, res: Response) => {
		// const userId = req.session?.userId;
		const users = await UserModel.deleteMany({});
		res.json(users);
	}),
);

export default router;
