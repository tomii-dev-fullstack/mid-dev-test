"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Paper, Stack } from "@mui/material";
import ButtonComponent from "../button/button";
import { ItemSelectField } from "../select/select";
import { TypeFilter } from "../select/types";
import { ItemTextField } from "../input/input_form";

export default function Filters() {
  const [type, setType] = useState<TypeFilter>("todos");
  const [search, setSearch] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (type && type !== "todos") params.set("type", type);
    else params.delete("type");

    if (search) params.set("search", search);
    else params.delete("search");

    if (fromDate) params.set("fromDate", fromDate);
    else params.delete("fromDate");

    if (toDate) params.set("toDate", toDate);
    else params.delete("toDate");

    params.set("page", "1");

    startTransition(() => {
      router.push(`/items?${params.toString()}`);
    });
  };

  const typeOptions = [
    { value: "todos", label: "Todos" },
    { value: "producto", label: "Producto" },
    { value: "servicio", label: "Servicio" },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        maxWidth: 1100,
        width: '100%',
        mb: 4,
        border: '1px dashed gray',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 1.5, sm: 2 }}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        <ItemSelectField
          name="type"
          label="Tipo"
          value={type}
          onChange={(name, value) => setType(value as TypeFilter)}
          options={typeOptions}
          size="small"

        />

        <ItemTextField
          name="search"
          label="Buscar"
          value={search}
          onChange={(name, value) => setSearch(value as string)}
          size="small"
          sx={{ width: { xs: '100%', sm: 200 } }} // 100% en xs, 200px en sm+
        />

        <ItemTextField
          name="fromDate"
          label="Desde"
          type="date"
          value={fromDate}
          onChange={(name, value) => setFromDate(value as string)}
          size="small"

          sx={{ width: { xs: '100%', sm: 'auto' } }}
        />

        <ItemTextField
          name="toDate"
          label="Hasta"
          type="date"
          value={toDate}
          onChange={(name, value) => setToDate(value as string)}
          size="small"
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        />

        <ButtonComponent
          type="button"
          onClick={handleFilter}
          color="primary"
          label={isPending ? 'Filtrando...' : 'Filtrar'}
          loading={isPending}
          variant="contained"
        />

        <ButtonComponent
          type="button"
          onClick={() => router.push('/items/add')}
          color="secondary"
          label="Agregar"
          variant="contained"
        />
      </Stack>
    </Paper>

  );
}
