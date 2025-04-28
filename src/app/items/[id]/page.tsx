"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Item } from "@/models/item"
import {
  Typography,
  Paper,
  Box,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material"
import Link from "next/link"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import { deleteItem, fetchItemById } from "@/utils/items"
import ModalComponent from "@/components/modal/modal"
import ButtonComponent from "@/components/button/button"
import { Props } from "./types"
import { ItemDetails } from "@/components/itemDetails/itemDetails"



export default function ItemDetailPage({ params }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [item, setItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getItem = async () => {
      try {
        const fetchedItem: Item | null = await fetchItemById(params.id)
        if (!fetchedItem || fetchedItem.deleted) {
          router.push("/items")
          return
        }
        setItem(fetchedItem)
      } catch (error: unknown) {
        console.error("Error fetching item:", error)
        router.push("/items")
      } finally {
        setLoading(false)
      }
    }
    getItem()
  }, [params.id, router])

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (!item) {
    // fallback (por seguridad extra)
    return null
  }


  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
        px={2}
      >

        <Box
          display="flex"
          alignItems="center"
          justifyContent={{ xs: "center", sm: "flex-start" }}
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
          mb={3}
          width="100%"
          maxWidth={600}
        >
          <Link href="/items" style={{ textDecoration: "none" }}>
            <Typography component="a" color="info">
              Volver
            </Typography>
          </Link>
        </Box>


        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3, md: 4 }, // padding: 2 en mobile, 3 en sm, 4 en md en adelante
            minHeight: "50vh",
            maxWidth: { xs: "100%", sm: 500, md: 600 }, // 100% en mobile, 500px en sm, 600px en md+
            width: "100%",
            border: "1px solid #ddd",
            borderRadius: 3,
            bgcolor: "#fff",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >

          <Box display="flex" alignItems="center" mb={3}>
            <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
              <Inventory2OutlinedIcon />
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              {item.name}
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <ItemDetails item={item} />

          <Box
            display="flex"
            justifyContent={{ xs: "center", sm: "flex-end" }}
            gap={1}
            flexWrap="wrap"
            pt={2}

          >
            <ButtonComponent
              disabled
              onClick={() => router.push(`/items/${params.id}/edit`)}
              label={loading ? "Cargando" : "Editar"}
            />
            <ButtonComponent
              disabled
              onClick={() => setOpen(true)}
              label="Eliminar"
            />
          </Box>
        </Paper>
      </Box>


      <ModalComponent
         onConfirm={async () => {
          try {
            const res = await deleteItem(params.id)
            if (res.success) {
              router.push('/items')
            } else {
              console.error('Error al eliminar ítem')
            }
          } catch (error) {
            console.error(error)
          }
          setOpen(false)
        }}
        id={params.id}
        open={open}
        setOpen={setOpen}
        title="Eliminar ítem"
        content={<Typography>¿Estás seguro de que deseas eliminar este ítem?</Typography>}
      />
    </Box>
  )
}
