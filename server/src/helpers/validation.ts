import { ObjectSchema } from 'joi';
import { BadRequest } from '../errors';

export const validateSchema = async (
	schema: ObjectSchema,
	body: unknown,
): Promise<void> => {
	try {
		await schema.validateAsync(body, { abortEarly: false });
	} catch (error) {
		throw new BadRequest(error);
	}
};
