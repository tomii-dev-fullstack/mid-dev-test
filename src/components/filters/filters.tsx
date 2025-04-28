"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Paper, Stack } from "@mui/material";
import ButtonComponent from "../button/button";
import { ItemSelectField } from "../select/select";
import { TypeFilter } from "../select/types";
import { ItemTextField } from "../input/input_form";

// Opciones de tipo
const typeOptions = [
  { value: "todos", label: "Todos" },
  { value: "producto", label: "Producto" },
  { value: "servicio", label: "Servicio" },
];

const initialFilters = {
  type: "todos" as TypeFilter,
  search: "",
  fromDate: "",
  toDate: "",
};

export default function Filters() {
  const [filters, setFilters] = useState(initialFilters);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (name: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Recorremos las keys del objeto de filtros
    Object.entries(filters).forEach(([key, value]) => {
      if (value && (key !== "type" || value !== "todos")) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.set("page", "1");

    startTransition(() => {
      router.push(`/items?${params.toString()}`);
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        maxWidth: 1100,
        width: "100%",
        mb: 4,
        border: "1px dashed gray",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 1.5, sm: 2 }}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        <ItemSelectField
          name="type"
          label="Tipo"
          value={filters.type}
          onChange={handleChange}
          options={typeOptions}
          size="small"
        />

        <ItemTextField
          name="search"
          label="Buscar"
          value={filters.search}
          onChange={handleChange}
          size="small"
          sx={{ width: { xs: "100%", sm: 200 } }}
        />

        <ItemTextField
          name="fromDate"
          label="Desde"
          type="date"
          value={filters.fromDate}
          onChange={handleChange}
          size="small"
          sx={{ width: { xs: "100%", sm: "auto" } }}
        />

        <ItemTextField
          name="toDate"
          label="Hasta"
          type="date"
          value={filters.toDate}
          onChange={handleChange}
          size="small"
          sx={{ width: { xs: "100%", sm: "auto" } }}
        />

        <ButtonComponent
          type="button"
          onClick={handleFilter}
          color="primary"
          label={isPending ? "Filtrando..." : "Filtrar"}
          loading={isPending}
          variant="contained"
        />

        <ButtonComponent
          type="button"
          onClick={() => router.push("/items/add")}
          color="secondary"
          label="Agregar"
          variant="contained"
        />
      </Stack>
    </Paper>
  );
}
