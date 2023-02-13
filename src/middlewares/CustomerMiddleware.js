import db from "../config/database.js";

export async function ValidateCustomer(req, res, next) {
    const {cpf} = req.body
    try {
        const checkCustomer = await db.query("SELECT * FROM customers WHERE cpf = $1",[cpf]);
        if (checkCustomer.rows[0]) return res.sendStatus(409)
    } catch (error) {
        return res.status(500).send(error.message)
    }
    next();
}

export async function ValidateCustomerSameId(req, res, next) {
    const {id} = req.params
    const {cpf} = req.body
    try {
        const checkCustomer = await db.query("SELECT * FROM customers WHERE cpf = $1",[cpf]);
        if (checkCustomer.rows[0] && checkCustomer.rows[0].id !== Number(id) ) return res.sendStatus(409)
    } catch (error) {
        return res.status(500).send(error.message)
    }
    next();
}