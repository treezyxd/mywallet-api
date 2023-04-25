import joi from "joi";

export const registerUserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().min(1).required(),
    password: joi.string().min(4).required(),
    confirm_password: joi.any().valid(joi.ref('password')).required()
});

export const loginUserSchema = joi.object({
    email: joi.string().email().min(1).required(),
    password: joi.string().min(4).required()
});