// lib/validator.ts
import { Response } from 'express';

export const validateRequest = (schema: any, data: any, res: Response) => {
    const { error } = schema.validate(data);
    if (error) {
        res.status(400).json({ error: error.message });
        return false;
    }
    return true;
};
