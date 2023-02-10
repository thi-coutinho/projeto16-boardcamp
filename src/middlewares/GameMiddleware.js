import db from "../config/database.js";

export async function ValidateGame(req, res, next) {
    const {name} = req.body
    try {
        const checkGame = await db.query("SELECT * FROM games WHERE name = $1",[name]);
        if (checkGame.rows[0]) return res.sendStatus(409)
    } catch (error) {
        return res.status(500).send(error.message)
    }
    next();
}