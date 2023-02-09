import db from "../config/database.js";

export async function getGames(req,res) {
    try {
        console.log("trying get games...")
        const games = await db.query("SELECT * FROM games;")
        res.send(games.rows)
    } catch (error) {
        console.log(JSON.stringify(error))
        res.status(500).send(JSON.stringify(error))
    }

}