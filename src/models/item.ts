//Modelo general
export interface Item {
  id: string;
  name: string;
  code: string;
  type: 'bien' | 'servicio';
  price: number;
  createdAt: string;
  deleted: boolean;
  deletedAt: string;
}

export interface Errors {
  name: string;
  price: string;
  code?: string;
}
type ValidationErrors = { name: string; price: string; code: string };

export interface Result {
  success: boolean;
  errors: Errors;
}

//Creación
export interface ItemFormData {
  name: string;
  code: string;
  price: number;
  type: 'bien' | 'servicio';
  deleted: boolean;
}

//Edición
export type ResultEditItemAction = {
  success: boolean;
  errors: ValidationErrors;
};


//API
export type ApiResponse = {
  error?: string;
  id?: string;
  ok: boolean
};





// 📦 Para GET (obtener item)
/* export type GetItemResponse = {
  success: boolean;
  item?: Item;
  error?: string;
};
 */
// 📦 Para PUT (editar item)
export type EditItemResponse = {
  success: boolean;
  item?: Item;
  error?: string;
};

// 📦 Para DELETE (ya lo tenías, pero lo dejo de referencia)
export type DeleteItemResponse = {
  success: boolean;
  message?: string;
  item?: Item;
  error?: string;
};

export type EditItemResponseItem = Item;
