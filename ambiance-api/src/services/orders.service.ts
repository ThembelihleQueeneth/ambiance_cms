import { supabase } from '../lib/supabase'

export const getOrders = async () => {
    const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, items(*))')

    if (error) throw error
    return data
}

export const createOrder = async (order: any) => {
    const { items, ...orderData } = order

    // 1. Create order
    const { data: newOrder } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single()

    // 2. Insert order items
    const orderItems = items.map((item: any) => ({
        order_id: newOrder.id,
        item_id: item.id,
        quantity: item.quantity,
        price: item.price
    }))

    await supabase.from('order_items').insert(orderItems)

    return newOrder
}

export const updateOrderStatus = async (id: string, status: string) => {
    const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)

    if (error) throw error
    return data
}