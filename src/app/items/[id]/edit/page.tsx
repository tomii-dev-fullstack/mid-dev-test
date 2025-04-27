import { Box, Card, CardContent, Typography } from '@mui/material';
import { Item } from '@/models/item';
import { EditItemForm } from '@/components/form/edit/edit';
import { fetchItemById } from '@/utils/items';
import Link from 'next/link';
import { Props } from './types';


export default async function EditItemPage({ params }: Props) {
  const id = params.id;
  const item: Item = await fetchItemById(id);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      px={2}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        mb={3}
        width="100%"

        maxWidth="700px"
      >
        <Link href={`/items/${id}`} style={{ textDecoration: 'none', color: "black" }}>
        <Typography component="a" color="info">
              Volver
            </Typography>
        </Link>
      </Box>

      <Card
        sx={{
          width: '100%',
          maxWidth: '700px',
          p: 3,
          boxShadow: 'none',
          border: '1px solid #ddd',
          borderRadius: 3,
          bgcolor: '#fff'
        }}
      >
        <CardContent>
          {
            item &&
            <EditItemForm itemm={item} id={id} />
          }
        </CardContent>
      </Card>
    </Box>
  );
}
