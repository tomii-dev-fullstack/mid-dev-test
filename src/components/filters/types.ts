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
  