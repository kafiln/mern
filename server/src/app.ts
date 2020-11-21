import { RedisStore } from 'connect-redis';
import express, { Application } from 'express';
import session from 'express-session';
import { SESSION_OPTIONS } from './config';
import { internalServerError, notFound } from './middlewares/errors';
import v1Routes from './routes/v1';

const createApp = (store: RedisStore): Application => {
	const app = express();

	// parse JSON
	app.use(express.json());

	// Use redis for cookies
	app.use(
		session({
			...SESSION_OPTIONS,
			store,
		}),
	);

	// register routes
	app.use('/v1', v1Routes);

	// catch 404 and forward to error handler
	app.use(notFound);

	// Middleware Error Handler
	app.use(internalServerError);

	return app;
};

export default createApp;
