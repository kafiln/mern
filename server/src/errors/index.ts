import { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } from '../constants';

export declare interface ValidationError {
	name?: string;
	value: string;
	type: string;
}

export abstract class HttpError extends Error {
	public status!: number;
	public errors!: ValidationError[];
}

export class BadRequest extends HttpError {
	constructor(message = BAD_REQUEST, errors: ValidationError[] = []) {
		super(message);
		this.status = 400;
		this.errors = errors;
	}
}
export class NotFound extends HttpError {
	constructor(message = NOT_FOUND) {
		super(message);
		this.status = 404;
	}
}
export class UnAuthorized extends HttpError {
	constructor(message = UNAUTHORIZED) {
		super(message);
		this.status = 401;
	}
}
