import { Router } from "express";
import { createRental, listRentals } from "../controllers/RentalsController.js";
import { ValidateRetal } from "../middlewares/RentalMiddleware.js";
import { ValidateSchema } from "../middlewares/ValidateSchemaMiddleware.js";
import { RentalSchema } from "../schemas/RentalSchema.js";

const RentalsRouter = Router()

RentalsRouter.get("/rentals",listRentals)
RentalsRouter.post("/rentals",ValidateSchema(RentalSchema),ValidateRetal,createRental)

export default RentalsRouter