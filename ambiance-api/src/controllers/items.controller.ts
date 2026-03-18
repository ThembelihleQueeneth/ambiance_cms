import { Request, Response } from 'express'
import * as service from '../services/items.service'

export const getItems = async (_req: Request, res: Response) => {
    try {
        const data = await service.getItems()
        res.json(data)
    } catch (error: any) {
        res.status(500).json({ error: error.message || error })
    }
}

export const createItem = async (req: Request, res: Response) => {
    try {
        const data = await service.createItem(req.body)
        res.json(data)
    } catch (error: any) {
        console.error("Create Item Error:", error)
        res.status(500).json({ error: error.message || error })
    }
}

export const updateItem = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const data = await service.updateItem(id, req.body)
        res.json(data)
    } catch (error: any) {
        res.status(500).json({ error: error.message || error })
    }
}

export const deleteItem = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const data = await service.deleteItem(id)
        res.json(data)
    } catch (error: any) {
        res.status(500).json({ error: error.message || error })
    }
}