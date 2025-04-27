import { ItemFormData, ResultEditItemAction } from "@/models/item";
import { validateItem } from "@/utils/helpers";

export async function editItemAction(id: string, item: ItemFormData): Promise<ResultEditItemAction> {
  const validationErrors = validateItem(item);

  if (validationErrors.name || validationErrors.price || validationErrors.code) {
    return { success: false, errors: validationErrors };
  }

  try {
    const res = await fetch(`/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
      cache: 'no-store'
    });

    if (!res.ok) {
      return {
        success: false,
        errors: { name: 'Error al editar item', price: '', code: '' },
      };
    }

    return { success: true, errors: { name: '', price: '', code: '' } };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: { name: 'Error inesperado', price: '', code: '' },
    };
  }
}
