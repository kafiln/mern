import { Request, Response, Router } from 'express';
import { asyncHandler } from '../../../helpers';
import { authenticated } from '../../../middlewares';
import { ResumeModel } from '../../../models';

const router = Router();

router.get(
	'/',
	authenticated,
	asyncHandler(async (req: Request, res: Response) => {
		// const userId = req.session?.userId;
		const resumes = await ResumeModel.find();
		res.json(resumes);
	}),
);
router.delete(
	'/',
	authenticated,
	asyncHandler(async (req: Request, res: Response) => {
		// const userId = req.session?.userId;
		const resumes = await ResumeModel.deleteMany({});
		res.json(resumes);
	}),
);

export default router;
