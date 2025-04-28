// Query params de GET
export type GetItemsQuery = {
    type?: string;
    search?: string;
    fromDate?: string;
    toDate?: string;
    page?: string;
    limit?: string;
  };
  
  // Body para POST
  export type CreateItemBody = {
    name: string;
    code?: string;
    type: 'bien' | 'servicio';
    price: number;
  };
  