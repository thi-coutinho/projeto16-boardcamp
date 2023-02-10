import joi from "joi";

//Payment schema
export const CustomerSchema = joi.object({
    name: joi.string().not(null).required(),
    phone: joi.string().min(10).max(11).pattern(/^[0-9]+$/).required(),    
    cpf: joi.string().length(11).pattern(/^[0-9]+$/).required(),    
    birthday: joi.date().required(),
});