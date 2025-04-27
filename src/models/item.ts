export interface Item {
  id: string;
  name: string;
  code: string;
  type: 'bien' | 'servicio';
  price: number;
  createdAt: string;
  deleted: boolean;
  deletedAt: string | null;
}

export interface Errors {
  name: string;
  price: string;
  code?: string;
}

export interface Result {
  success: boolean;
  errors: Errors;
}
export interface ItemFormData {
  name: string;
  code: string;
  price: number;
  type: 'bien' | 'servicio';
  deleted: boolean;
}
type ValidationErrors = { name: string; price: string; code: string };

export type ResultEditItemAction = {
  success: boolean;
  errors: ValidationErrors;
};