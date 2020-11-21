export abstract class HttpError extends Error {
	public status!: number;
}

export class BadRequest extends HttpError {
	constructor(message = 'Bad request') {
		super(message);
		this.status = 400;
	}
}
export class NotFound extends HttpError {
	constructor(message = 'Not found') {
		super(message);
		this.status = 404;
	}
}
export class Authorized extends HttpError {
	constructor(message = 'Unauthorized') {
		super(message);
		this.status = 401;
	}
}
