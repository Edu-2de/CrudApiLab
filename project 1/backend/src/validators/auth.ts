import Joi from 'joi';
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
export const registerSchema = Joi.object({
  first_name: Joi.string().required(),
  second_name: Joi.string().allow('').optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});