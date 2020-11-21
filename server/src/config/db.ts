import { ConnectionOptions } from 'mongoose';

const {
	DB_USER = 'admin',
	DB_PASSWORD = 'secret',
	DB_HOST = 'mongo',
	DB_PORT = '27017',
	DB_NAME = 'resumium',
} = process.env;

export const DB_OPTIONS: ConnectionOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
};

export const MONGO_URI = `mongodb://${DB_USER}:${encodeURIComponent(
	DB_PASSWORD,
)}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
