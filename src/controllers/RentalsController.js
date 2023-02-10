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

export async function listRentals(req, res) {
    try {
        const queryCustomersList = await db.query('SELECT * FROM customers;')
        const queryGamesList = await db.query('SELECT * FROM games;')
        const queryRentalsList = await db.query('SELECT * FROM rentals;')
        const finalList = queryRentalsList.rows.map(rental => {

            return {
                ...rental,
                customer: {
                    id: rental.customerId,
                    name:queryCustomersList.rows.find(c => c.id===rental.customerId).name
                },
                game:{
                    id:rental.gameId,
                    name: queryGamesList.rows.find(c => c.id===rental.customerId).name
                } 
            }
        }
        )

        res.send(finalList)

    } catch (error) {
        res.status(500).send(error.message)

    }

}