import { Request, Response, Router } from 'express';
import { asyncHandler } from '../../../helpers';
import { authenticated } from '../../../middlewares';
import { UserModel } from '../../../models';

const router = Router();

router.use(
	'/',
	authenticated,
	asyncHandler(async (req: Request, res: Response) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const userId = (req.session as any).userId;
		const user = await UserModel.findById(userId);
		res.json(user);
	}),
);

export default router;
