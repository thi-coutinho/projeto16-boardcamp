import db from "../config/database.js";

export async function ValidateRental(req, res, next) {
    const { customerId, gameId } = req.body
    try {
        const checkGame = await db.query("SELECT * FROM games WHERE id = $1", [gameId]);
        if (!checkGame.rows[0]) return res.sendStatus(400)
        const checkCustomer = await db.query("SELECT * FROM customers WHERE id = $1", [customerId]);
        if (!checkCustomer.rows[0]) return res.sendStatus(400)
        const rentalQuery = await db.query('SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" ISNULL;', [gameId])
        const gamesRented = rentalQuery.rowCount
        const gamesStock = checkGame.rows[0].stockTotal
        if (gamesRented >= gamesStock) return res.sendStatus(400)
    } catch (error) {
        return res.status(500).send(error.message)
    }
    next();
}


export async function ValidateReturnRental(req, res, next) {
    const {id} = req.params
    try {
        const checkRental = await db.query("SELECT * FROM rentals WHERE id = $1", [id]);
        if (!checkRental.rows[0]) return res.sendStatus(404)
        if (checkRental.rows[0].returnDate) return res.sendStatus(400)
    } catch (error) {
        return res.status(500).send(error.message)
    }
    next();
}

export async function ValidateDeleteRental(req, res, next) {
    const {id} = req.params
    try {
        const checkRental = await db.query("SELECT * FROM rentals WHERE id = $1", [id]);
        if (!checkRental.rows[0]) return res.sendStatus(404)
        if (!checkRental.rows[0].returnDate) return res.sendStatus(400)
    } catch (error) {
        return res.status(500).send(error.message)
    }
    next();
}