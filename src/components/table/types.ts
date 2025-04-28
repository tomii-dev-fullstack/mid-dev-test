import { Item } from "@/models/item";

export interface TableComponentProps {
    items: Item[];
    totalPages: number;
    currentPage: number;
}