import Joi from 'joi';

export const bookBorrowValidationSchema = Joi.object({

    userId: Joi.number().integer().required(),
    bookId: Joi.number().integer().required(),
});

export const returnAndRateBookValidationSchema = Joi.object({

    score: Joi.number().integer().min(1).max(100).required(),
    userId: Joi.number().integer().required(),
    bookId: Joi.number().integer().required(),
});
