'use client';

import { Box } from '@mui/material';
import { FormField, itemFormFields } from '@/lib/config';
import { Errors, ItemFormData, Result } from '@/models/item';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createItemAction } from '@/utils/createItemAction';
import ButtonComponent from '../../button/button';
export const AddItemForm = () => {
  const router = useRouter();
  const [item, setItem] = useState<ItemFormData>({
    name: '',
    code: '',
    price: 0,
    type: 'bien',
    deleted: false,
  });

  const [errors, setErrors] = useState<Errors>({ name: "", price: "", code: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (name: string, value: string | number) => {
    setItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result: Result = await createItemAction(item);

    if (result.success) {
      router.push('/items');
    } else {
      setErrors(result.errors);
    }

    setLoading(false);
  };

  const formFields: FormField[] = itemFormFields(item, handleChange, errors);

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
      {formFields.map((field: FormField, index) => (
        <field.component key={index} {...field.props} />
      ))}
      <ButtonComponent type='submit' disabled={loading} onClick={() => console.log("Clickeado")} color='success' label={loading ? "Agregando..." : "Agregar"} variant='contained' />

    </Box>
  );
};
