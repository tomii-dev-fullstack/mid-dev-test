import { ItemFilters } from "@/components/filters/types";
import { ItemFormData } from "@/models/item";

export const validateItem = (item: ItemFormData) => {
  const errors = {
    name: '',
    price: '',
    code: ""
  };

  if (!item.name.trim()) errors.name = 'El nombre es obligatorio.';
  if (item.price <= 0) errors.price = 'El precio debe ser mayor a cero.';

  return errors;
};

// utils/format.ts
export const formatPriceGTQ = (price: number) =>
  price.toLocaleString("es-GT", { style: "currency", currency: "GTQ" });

export const formatDateGT = (date: string) =>
  new Date(date).toLocaleDateString("es-GT");
export const buildSearchParams = (params: Partial<ItemFilters>) => {
  const searchParams = new URLSearchParams();
  (Object.entries(params) as [keyof ItemFilters, string][]).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });
  return searchParams;
};

