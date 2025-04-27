'use client';
import { Box, Modal, Typography, Stack } from '@mui/material';
import { deleteItem } from '@/utils/items';
import { useRouter } from 'next/navigation';
import ButtonComponent from '../button/button';
import { ModalComponentProps } from './types';

export default function ModalComponent({
    title,
    content,
    open,
    setOpen,
    id,
}: ModalComponentProps) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const res = await deleteItem(id);
            if (res.ok) {
                setOpen(false)
                router.push('/items');
            } else {
                console.error('Error al eliminar ítem');
            }
        } catch (error) {
            console.error(error);
        }
        setOpen(false);
    };

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
                    borderRadius: 3,
                    boxShadow: 24,
                    p: 4,
                    width: { xs: '90%', sm: 400 },
                }}
            >
                <Typography id="modal-title" variant="h6" color="text.primary" mb={2}>
                    {title}
                </Typography>

                <Box id="modal-description" mb={3} color="text.secondary">
                    {content}
                </Box>

                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <ButtonComponent  onClick={handleClose} color='info' label="Cancelar" variant='outlined' disabled/>
                    <ButtonComponent  onClick={handleDelete} color='error' label="Eliminar" variant='contained' disabled/>
                 
                </Stack>
            </Box>
        </Modal>
    );
}
