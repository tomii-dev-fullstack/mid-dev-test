export interface ItemSelectFieldProps {
  name: string;
  label: string;
  value: "producto" | "servicio" | "todos"
  onChange: (name: string, value: string) => void;
  options: { value: string; label: string }[];
  size?: string
}
export type TypeFilter = "todos" | "producto" | "servicio";
