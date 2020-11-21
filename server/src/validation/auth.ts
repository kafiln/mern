import joi from 'joi';

const name = joi.string().required().min(3).max(128).trim();
const email = joi.string().email().lowercase().trim().required();
const password = joi.string().required();

export const registerInput = joi.object({
	name,
	email,
	password,
	password2: joi.valid(joi.ref('password')).required(),
});

export const loginInput = joi.object({
	email,
	password,
});
