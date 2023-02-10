import db from "../config/database.js"

export async function createRental(req, res) {
    const { customerId, gameId, daysRented } = req.body
    const rentDate = new Date()
    try {
        const game = await db.query("SELECT * FROM games WHERE id = $1;", [gameId])
        const originalPrice = Number(game.rows[0].pricePerDay) * daysRented
        await db.query(
            'INSERT INTO rentals \
            ("customerId", "gameId", "daysRented","rentDate", "originalPrice","returnDate","delayFee") \
            VALUES ($1, $2, $3, $4, $5, $6, $7);',
            [customerId, gameId, daysRented, rentDate, originalPrice, null, null]
        )
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}