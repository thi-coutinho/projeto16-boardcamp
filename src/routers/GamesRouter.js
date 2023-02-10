import { Router } from "express";
import { createGame, getGames } from "../controllers/GamesController.js";
import { ValidateGame } from "../middlewares/GameMiddleware.js";
import { ValidateSchema } from "../middlewares/ValidateSchemaMiddleware.js";
import { GameSchema } from "../schemas/GameSchema.js";

const GamesRouter = Router()

GamesRouter.get("/games",getGames)
GamesRouter.post("/games",ValidateSchema(GameSchema),ValidateGame,createGame)

export default GamesRouter