import Link from 'next/link'
import { Box, Link as MuiLink } from '@mui/material';

import Filters from '@/components/filters/filters';
import { Props } from './types';
import { TableComponent } from '@/components/table/table';

export default function ItemsTable({ items, totalPages, currentPage }: Props) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={5} px={2}>
      <Filters />

      <TableComponent items={items} />
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

  )
}
