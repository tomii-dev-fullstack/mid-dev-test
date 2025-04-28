import { ItemSelectField } from '@/components/select/select';
import { ItemTextField } from '@/components/input/input_form';
import { ItemFormData } from '@/models/item';
// Props de cada tipo de input
export interface ItemSelectFieldProps {
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (name: string, value: string | number) => void;
  error?: boolean;
  helperText?: string;
}

export interface ItemTextFieldProps {
  name: string;
  label: string;
  type?: string;
  value: string | number;
  onChange: (name: string, value: string | number) => void;
  error?: boolean;
  helperText?: string;
}

// Unificación de  las props posibles
type AnyFieldProps = ItemTextFieldProps | ItemSelectFieldProps;

// Config de cada campo
export interface FieldConfig {
  component: React.FC<AnyFieldProps>;  
  props: AnyFieldProps;
}

export type FormField = FieldConfig;

// Función para generar los campos del formulario
export const itemFormFields = (
  item: ItemFormData,
  handleChange: (name: string, value: string | number, type?: 'producto' | 'servicio') => void,
  errors?: { name: string; price: string; code?: string }
): FormField[] => [
  {
    component: ItemTextField as React.FC<AnyFieldProps>,
    props: {
      name: 'name',
      label: 'Nombre',
      value: item.name,
      onChange: (name, value) => handleChange(name, value),
      error: !!errors?.name,
      helperText: errors?.name,
    },
  },
  {
    component: ItemSelectField as React.FC<AnyFieldProps>,
    props: {
      name: 'type',
      label: 'Tipo',
      value: item.type,
      onChange: (name, value) => handleChange(name, value, value as 'producto' | 'servicio'),
      options: [
        { value: 'bien', label: 'Bien' },
        { value: 'servicio', label: 'Servicio' },
      ],
    },
  },
  {
    component: ItemTextField as React.FC<AnyFieldProps>,
    props: {
      name: 'code',
      label: 'Código',
      value: item.code,
      onChange: (name, value) => handleChange(name, value),
      error: !!errors?.code,
      helperText: errors?.code,
    },
  },
  {
    component: ItemTextField as React.FC<AnyFieldProps>,
    props: {
      name: 'price',
      label: 'Precio',
      type: 'producto',
      value: item.price,
      onChange: (name, value) => handleChange(name, value === '' ? 1 : Number(value)),
      error: !!errors?.price,
      helperText: errors?.price,
    },
  },
];
