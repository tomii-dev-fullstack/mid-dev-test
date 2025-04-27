import ItemsPage from './items_page';
import { Box, Typography } from '@mui/material';
import { ItemsSSRProps } from './types';


export default async function ListItems({ searchParams }: ItemsSSRProps) {
    const page = Number(searchParams.page) || 1;
    const limit = 5;

    const type = searchParams.type || "";
    const search = searchParams.search || "";
    const fromDate = searchParams.fromDate || "";
    const toDate = searchParams.toDate || "";
    const code = searchParams.code || "";
    const name = searchParams.name || "";

    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });
    if (type) params.set("type", type);
    if (name) params.set("type", name);
    if (search) params.set("search", search);
    if (fromDate) params.set("fromDate", fromDate);
    if (toDate) params.set("toDate", toDate);
    if (code) params.set("code", code);

    const res = await fetch(`${process.env.BASE_URL}/api/items?${params.toString()}`, {
        next: { revalidate: 0 },
    });
    const data = await res.json();

    const totalPages = Math.ceil(data.total / limit);

    return (
        <Box p={4}>
            <Typography variant="h4" color='black' textAlign={"center"} gutterBottom>
                Gestión de ítems con SSR
            </Typography>
            <ItemsPage
                items={data.items}
                totalPages={totalPages}
                currentPage={page}
            />
        </Box>
    );
}
