import { Item } from "@/models/item"

export interface Props {
  items: Item[]
  totalPages: number
  currentPage: number

}