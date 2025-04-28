import { API_LOCAL } from '@/lib/api';
import { DeleteItemResponse, EditItemResponse, Item } from '@/models/item';

// Funciones auxiliares

export const fetchItemById = async (id: string): Promise<Item> => {
  const res = await fetch(`${API_LOCAL}/api/items/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Error al obtener el item');
  }
  const data: Item = await res.json();
  return data
};


export async function deleteItem(id: string): Promise<DeleteItemResponse> {
  const res = await fetch(`${API_LOCAL}/api/items/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }, cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Error al eliminar el ítem');
  }
  const data = await res.json();
  return { success: true, ...data };
}

export async function editItem(id: string, data: Promise<EditItemResponse>) {
  const res = await fetch(`${API_LOCAL}/api/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }, cache: 'no-store',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Error al editar el ítem');
  }

  const updatedItem: Item = await res.json();
  return { success: true, item: updatedItem };
}