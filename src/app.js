import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import GamesRouter from './routers/GamesRouter.js'
import CustomersRouter from './routers/CustomersRouter.js'
import RentalsRouter from './routers/RentalsRouter.js'
dotenv.config()

const server = express()
server.use(cors())
server.use(express.json())

server.use([GamesRouter,CustomersRouter,RentalsRouter])

const PORT = process.env.PORT

server.listen(PORT,()=>console.log(`Server on port ${PORT}`))