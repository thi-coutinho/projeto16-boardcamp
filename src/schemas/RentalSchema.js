import joi from "joi";

//Payment schema
export const RentalSchema = joi.object({
    customerId: joi.number().integer().positive().required(),
    gameId: joi.number().integer().positive().required(),    
    daysRented: joi.number().integer().min(1).required()
});