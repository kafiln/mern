import { NextFunction, Request, Response } from 'express';
import { AsyncValidationOptions, ObjectSchema, ValidationErrorItem } from 'joi';
import { BadRequest, ValidationError } from '../errors';

export const validateSchema = (schema: ObjectSchema) => async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const options: AsyncValidationOptions = {
			abortEarly: false,
			errors: {
				wrap: {
					label: false,
					array: false,
				},
			},
		};

		await schema.validateAsync(req.body, options);
	} catch (errors) {
		const result: ValidationError[] = [];
		errors.details.forEach((detail: ValidationErrorItem) => {
			result.push({
				name: detail.context?.key,
				value: detail.message,
				type: detail.type,
			});
		});
		next(new BadRequest('', result));
	}
	next();
};
