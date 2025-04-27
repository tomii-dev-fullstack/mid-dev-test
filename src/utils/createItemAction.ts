
import { validateItem } from "@/utils/helpers";
import { ItemFormData, Result } from "@/models/item";

export async function createItemAction(item: ItemFormData): Promise<Result> {
  const validationErrors = validateItem(item);
  if (validationErrors.name || validationErrors.price || validationErrors.code) {
    return { success: false, errors: validationErrors };
  }

  try {
    const res = await fetch(`/api/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
      cache: 'no-store'
    });

    if (!res.ok) {
      return {
        success: false,
        errors: { name: 'Error al crear item', price: '', code: "" }
      };
    }

    return { success: true, errors: { name: '', price: '', code: "" } };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: { name: 'Error inesperado', price: '', code: "" }
    };
  }
}