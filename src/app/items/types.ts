import { ItemFilters } from "@/components/filters/types";
import { Item } from "@/models/item"

export interface Props {
  items: Item[]
  totalPages: number
  currentPage: number

}
export interface ItemsSSRProps {
    searchParams: ItemFilters;
}
export interface ItemsApiResponse {
  total: number;
  items: Item[];
}