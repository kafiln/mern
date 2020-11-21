import { Router } from 'express';
import authRoutes from './auth';
import homeRoutes from './home';
import resumeRoutes from './resume';
import userRoutes from './user';

const router = Router();

router.use('/home', homeRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/resume', resumeRoutes);

export default router;
