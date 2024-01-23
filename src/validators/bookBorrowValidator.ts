import Joi from 'joi';

export const bookBorrowValidationSchema = Joi.object({
    // Kitap ödünç alma doğrulama şeması
    borrowDate: Joi.date().required(),
    userId: Joi.number().integer().required(),
    bookId: Joi.number().integer().required(),
});

export const returnAndRateBookValidationSchema = Joi.object({
    // Kitap teslim etme ve değerlendirme doğrulama şeması
    returnDate: Joi.date().required(),
    score: Joi.number().integer().min(1).max(5).required(),
    userId: Joi.number().integer().required(),
    bookId: Joi.number().integer().required(),
});
