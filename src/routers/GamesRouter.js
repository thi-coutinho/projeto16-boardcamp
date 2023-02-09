import { Router } from "express";
import { getGames } from "../controllers/GamesController.js";

const GamesRouter = Router()

GamesRouter.get("/games",getGames)

export default GamesRouter