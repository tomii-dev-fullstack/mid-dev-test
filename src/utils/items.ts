import { API_LOCAL } from '@/lib/api';
import { Item } from '@/models/item';

export const fetchItemById = async (id: string): Promise<Item> => {
  const res = await fetch(`${API_LOCAL}/api/items/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Error al obtener el item');
  }

  return res.json();
};


export async function deleteItem(id: string) {
  const res = await fetch(`${API_LOCAL}/api/items/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }, next: { revalidate: 0 }
  });

  if (!res.ok) {
    throw new Error('Error al eliminar el ítem');
  }

  return res;
}

export async function editItem(id: string, data: Item) {
  const res = await fetch(`${API_LOCAL}/api/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Error al editar el ítem');
  }

  return res.json()
}