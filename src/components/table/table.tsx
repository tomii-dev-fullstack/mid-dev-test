import { formatDateGT, formatPriceGTQ } from "@/utils/helpers"
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link as MuiLink
} from '@mui/material';
import Link from "next/link"
import { TableComponentProps } from "./types";

export const TableComponent = ({ items }: TableComponentProps) => {
    return (
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
    )
}