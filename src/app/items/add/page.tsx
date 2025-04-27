import { Box, Card, CardContent, Typography } from '@mui/material';
import { AddItemForm } from '@/components/form/add/add';

export default function AddItemPage() {
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
      <Card
        sx={{
          maxWidth: 700,
          width: '100%',
          p: 3,
          border: '1px solid #ddd',
          borderRadius: 3,
          boxShadow: 'none',
          bgcolor: '#fff',
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Agregar ítem
          </Typography>
          <AddItemForm />
        </CardContent>
      </Card>
    </Box>
  );
}
