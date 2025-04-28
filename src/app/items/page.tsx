import ItemsPage from './items_page';
import { Box, Typography } from '@mui/material';
import { ItemsApiResponse, ItemsSSRProps } from './types';
import { ItemFilters } from '@/components/filters/types';
import { buildSearchParams } from '@/utils/helpers';


export default async function ListItems({ searchParams }: ItemsSSRProps) {
    const limit = 5;
    const page = Number(searchParams.page) || 1;

    const queryEntries: Partial<ItemFilters> = {
        page: String(page),
        limit: String(limit),
        type: searchParams.type,
        search: searchParams.search,
        fromDate: searchParams.fromDate,
        toDate: searchParams.toDate,
        code: searchParams.code,
        name: searchParams.name,
    };

    const params = buildSearchParams(queryEntries);

    (Object.entries(queryEntries) as [keyof ItemFilters, string][]).forEach(([key, value]) => {
        if (value) params.set(key, value);
    });


    const res = await fetch(`${process.env.BASE_URL}/api/items?${params.toString()}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch items: ${res.status}`);
    }

    const data: ItemsApiResponse = await res.json();
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
