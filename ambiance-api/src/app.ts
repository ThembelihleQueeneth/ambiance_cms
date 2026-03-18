import express from 'express'
import cors from 'cors'
import itemsRoutes from './routes/items.routes'
import ordersRoutes from './routes/orders.routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/items', itemsRoutes)
app.use('/orders', ordersRoutes)

export default app