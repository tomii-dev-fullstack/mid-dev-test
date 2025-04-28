export interface ItemFilters {
  type?: "producto" | "servicio" | "todos";
  search?: string;
  fromDate?: string;
  toDate?: string;
  page?: string;
  limit?: string;
  name?: string;
  code?: string;
}


export type OnChangeHandler = (name: string, value: string | number) => void;
