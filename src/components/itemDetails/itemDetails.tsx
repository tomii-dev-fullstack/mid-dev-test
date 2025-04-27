import { Box, Stack, Typography } from '@mui/material';
import { formatDateGT, formatPriceGTQ } from '@/utils/helpers';
import { AllowedVariants, ItemDetailsProps } from './types';

export const ItemDetails = ({ item }: ItemDetailsProps) => {
  const details: {
    label: string;
    value: string;
    color?: string;
    variant?: AllowedVariants;
  }[] = [
      { label: 'Código', value: item.code },
      { label: 'Tipo', value: item.type },
      { label: '', value: formatPriceGTQ(Number(item.price)), color: 'success.main', variant: 'h6' },
      { label: 'Creado el', value: formatDateGT(item.createdAt), variant: 'body2' },
    ];

  return (
    <Box flexGrow={1}>
      <Stack spacing={1}>
        {details.map((detail, index) => (
          <Typography
            key={index}
            variant={detail.variant ?? 'body1'}
            color={detail.color ?? 'text.secondary'}
          >
            {detail.label && <>{detail.label}: </>}
            <strong>{detail.value}</strong>
          </Typography>
        ))}
      </Stack>
    </Box>

  );
};
