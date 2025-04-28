'use client';

import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Errors, Item, ItemFormData } from '@/models/item';
import { editItemAction } from '@/utils/editItemAction';
import { FormField, itemFormFields } from '@/lib/config';
import ButtonComponent from '../../button/button';
import { EditItemFormProps } from './types';

export const EditItemForm = ({ itemm, id }: EditItemFormProps) => {
  const router = useRouter();
  const [item, setItem] = useState<ItemFormData>({
    name: itemm.name,
    code: itemm.code,
    price: itemm.price,
    type: itemm.type,
    deleted: itemm.deleted,
  });

  const [errors, setErrors] = useState<Errors>({ name: '', price: '', code: '' });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (name: string, value: string | number) => {
    setItem((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Delay artificial de 1 segundo
    await new Promise(resolve => setTimeout(resolve, 1000));
    const result = await editItemAction(id, item);

    if (result.success) {
      router.push('/items');
    } else {
      setErrors(result.errors);
    }

    setLoading(false);
  };

  //Configuración de inputs dinamicos
  const formFields: FormField[] = itemFormFields(item as Item, handleChange, errors);

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
      {formFields.map((field, index) => (
        <field.component key={index} {...field.props} />
      ))}
      <ButtonComponent
        disabled={false}
        label={loading ? "Guardando" : "Guardar cambios"}
        type="submit"
        color="success"
        loading={loading}
      />

    </Box>
  );
};
