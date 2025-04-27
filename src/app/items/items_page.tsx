import Link from 'next/link'
import { formatDateGT, formatPriceGTQ } from '@/utils/helpers';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Box, Link as MuiLink
} from '@mui/material';

import Filters from '@/components/filters/filters';
import { Props } from './types';

export default function ItemsTable({ items, totalPages, currentPage }: Props) {
  return (
    <div>
      {/* render tabla */}
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={5} px={2}>
        <Filters />


        <TableContainer component={Paper} sx={{ maxWidth: 1100, width: '100%', mb: 3 }} elevation={0}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell><strong>Código</strong></TableCell>
                <TableCell><strong>Tipo</strong></TableCell>
                <TableCell align="right"><strong>Precio (Q)</strong></TableCell>
                <TableCell><strong>Creación</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No se encontraron resultados.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Link href={`/items/${item.id}`} passHref legacyBehavior>
                        <MuiLink underline="hover" color="primary">{item.name}</MuiLink>
                      </Link>
                    </TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell align="right">{formatPriceGTQ(item.price)}</TableCell>
                    <TableCell>{formatDateGT(item.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>


        <Box mt={2}>

        </Box>
        <Box mt={2} display="flex" gap={1} flexWrap="wrap">


          {Array.from({ length: totalPages }).map((_, index) => (
            <Link
              key={index}
              href={`/items?page=${index + 1}`}
              passHref
              legacyBehavior
            >
              <MuiLink
                underline="hover"
                sx={{
                  px: 2, py: 1, borderRadius: '4px',
                  bgcolor: currentPage === index + 1 ? 'primary.main' : 'transparent',
                  color: currentPage === index + 1 ? '#fff' : 'primary.main',
                  border: '1px solid #1976d2'
                }}
              >
                {index + 1}
              </MuiLink>
            </Link>
          ))}
        </Box>
      </Box>
    </div>
  )
}
