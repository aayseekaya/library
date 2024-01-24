import Joi from 'joi';

export const bookValidationSchema = Joi.object({

    name: Joi.string().required()
});


