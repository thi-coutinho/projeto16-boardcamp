import { Router } from "express";
import { createRental, deleteRental, listRentals, returnRental } from "../controllers/RentalsController.js";
import { ValidateDeleteRental, ValidateRental, ValidateReturnRental } from "../middlewares/RentalMiddleware.js";
import { ValidateSchema } from "../middlewares/ValidateSchemaMiddleware.js";
import { RentalSchema } from "../schemas/RentalSchema.js";

const RentalsRouter = Router()

RentalsRouter.get("/rentals",listRentals)
RentalsRouter.post("/rentals",ValidateSchema(RentalSchema),ValidateRental,createRental)
RentalsRouter.post("/rentals/:id/return",ValidateReturnRental,returnRental)
RentalsRouter.delete("/rentals/:id",ValidateDeleteRental,deleteRental)

export default RentalsRouter