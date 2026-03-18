import { Request, Response } from 'express'
import * as service from '../services/orders.service'

export const getOrders = async (_req: Request, res: Response) => {
    const data = await service.getOrders()
    res.json(data)
}

export const createOrder = async (req: Request, res: Response) => {
    const data = await service.createOrder(req.body)
    res.json(data)
}

export const updateOrderStatus = async (req: Request, res: Response) => {
    const { id } = req.params
    const { status } = req.body

    const data = await service.updateOrderStatus(id as string, status)
    res.json(data)
}