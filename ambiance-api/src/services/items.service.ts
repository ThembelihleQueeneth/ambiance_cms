import { supabase } from '../lib/supabase'

export const getItems = async () => {
    const { data, error } = await supabase.from('items').select('*')
    if (error) throw error
    return data
}

export const createItem = async (item: any) => {
    const { data, error } = await supabase.from('items').insert([item])
    if (error) throw error
    return data
}

export const updateItem = async (id: string, updates: any) => {
    const { data, error } = await supabase
        .from('items')
        .update(updates)
        .eq('id', id)

    if (error) throw error
    return data
}

export const deleteItem = async (id: string) => {
    const { data, error } = await supabase
        .from('items')
        .delete()
        .eq('id', id)

    if (error) throw error
    return data
}