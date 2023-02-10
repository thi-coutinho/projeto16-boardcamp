import { Router } from "express";
import { createCustomer, getCustomerById, getCustomers, updateCustomer } from "../controllers/CustomersController.js";
import { ValidateCustomer, ValidateCustomerSameId } from "../middlewares/CustomerMiddleware.js";
import { ValidateSchema } from "../middlewares/ValidateSchemaMiddleware.js";
import { CustomerSchema } from "../schemas/CustomerSchema.js";

const CustomersRouter = Router()

CustomersRouter.get("/customers",getCustomers)
CustomersRouter.get("/customers/:id",getCustomerById)
CustomersRouter.post("/customers",ValidateSchema(CustomerSchema),ValidateCustomer,createCustomer)
CustomersRouter.put("/customers/:id",ValidateSchema(CustomerSchema),ValidateCustomerSameId,updateCustomer)

export default CustomersRouter