import { Item } from "@/models/item";

export type ItemUpdateData = Pick<Item, 'name' | 'type' | 'price' | 'code'>;
export type Params = { params: { id: string } };