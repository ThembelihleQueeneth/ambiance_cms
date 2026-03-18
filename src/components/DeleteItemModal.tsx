import { useState } from 'react';
import api from '../services/api';

type Item = {
    id: number;
    name: string;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onItemDeleted: () => void;
    item: Item | null;
};

export default function DeleteItemModal({ isOpen, onClose, onItemDeleted, item }: Props) {
    const [loading, setLoading] = useState(false);

    if (!isOpen || !item) return null;

    const handleDelete = async () => {
        try {
            setLoading(true);
            await api.delete(`/items/${item.id}`);
            onItemDeleted();
            onClose();
        } catch (err) {
            console.error("Failed to delete item", err);
            alert("Failed to delete item.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
            <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-2xl transform transition-all text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>

                <h2 className="text-xl font-bold mb-2 text-gray-800">
                    Delete Item
                </h2>
                <p className="text-gray-500 mb-6 px-2">
                    Are you sure you want to delete <span className="font-semibold text-gray-700">"{item.name}"</span>? This action cannot be undone.
                </p>

                <div className="flex justify-center gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300 disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}