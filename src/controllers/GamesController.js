import db from "../config/database.js";

export async function getGames(req,res) {
    try {
        const games = await db.query("SELECT * FROM games;")
        res.send(games.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function createGame (req,res) {
    const {name,image,stockTotal,pricePerDay} = req.body
    try {
        await db.query('INSERT INTO games (name,image,"stockTotal","pricePerDay") values ($1,$2,$3,$4);',[name,image,stockTotal,pricePerDay])
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}