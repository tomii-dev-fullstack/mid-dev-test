'use client';
import { Box, Modal, Typography, Stack } from '@mui/material';
import ButtonComponent from '../button/button';
import { ModalComponentProps } from './types';

export default function ModalComponent({
    title,
    onConfirm,
    content,
    open,
    setOpen,
}: ModalComponentProps) {


    const handleClose = () => setOpen(false);

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 0,
            boxShadow: 24,
            p: { xs: 2, sm: 3, md: 4 },
            width: { xs: '90%', sm: 400, md: 500 },
            maxWidth: '95vw',
          }}
        >
          <Typography id="modal-title" variant="h6" color="text.primary" mb={2}>
            {title}
          </Typography>
      
          <Box id="modal-description" mb={3} color="text.secondary">
            {content}
          </Box>
      
          <Stack
            direction="row"
            spacing={{ xs: 1, sm: 2 }} 
            justifyContent="flex-end"
            flexWrap="wrap" 
          >
            <ButtonComponent
              onClick={handleClose}
              color="info"
              label="Cancelar"
              variant="outlined"
              disabled
            />
            <ButtonComponent
              onClick={onConfirm}
              color="error"
              label="Eliminar"
              variant="contained"
              disabled
            />
          </Stack>
        </Box>
      </Modal>
      
    );
}
