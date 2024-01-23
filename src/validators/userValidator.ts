import Joi from 'joi';

export const userValidationSchema = Joi.object({
    name: Joi.string().required(),
});
