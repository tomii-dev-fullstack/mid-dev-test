import { Item } from "@/models/item";
import { TypographyProps } from "@mui/material";

export interface ItemDetailsProps {
  item: Item;
}

export type AllowedVariants = TypographyProps['variant'];
