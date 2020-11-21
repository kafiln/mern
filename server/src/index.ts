import connectRedis from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';
import mongoose from 'mongoose';
import createApp from './app';
import { APP_PORT, DB_OPTIONS, MONGO_URI, REDIS_OPTIONS } from './config';

// Redis
const RedisStore = connectRedis(session);
const client = new Redis(REDIS_OPTIONS);
const store = new RedisStore({ client });

// Mongo
mongoose
	.connect(MONGO_URI, DB_OPTIONS)
	.then(_ => console.log('DB Connection OK'));

// Exporess App
const app = createApp(store);

app.listen(APP_PORT, () => {
	console.log(`⚡️[server]: Server is running at PORT ${APP_PORT}`);
});
