import { NextRequest, NextResponse } from 'next/server';
import items from '@/lib/db.json';
import { v4 as uuidv4 } from 'uuid';
import { Item } from "@/models/item"
import { CreateItemBody } from './types';
const allowedTypes = ['producto', 'servicio'];
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get('type');
  const search = searchParams.get('search')?.toLowerCase();
  const fromDate = searchParams.get('fromDate');
  const toDate = searchParams.get('toDate');
  const getNumberParam = (key: string, fallback: number) => {
    const value = parseInt(searchParams.get(key) || '');
    return Number.isNaN(value) || value <= 0 ? fallback : value;
  };

  const page = getNumberParam('page', 1);
  const limit = getNumberParam('limit', 5);
  const typedItems = items as Item[];
  let filteredItems: Item[] = typedItems.filter(item => !item.deleted);

  if (type && type !== "todos") {
    filteredItems = filteredItems.filter(item => item.type === type);
  }

  if (search) {
    filteredItems = filteredItems.filter(item =>
      item.name.toLowerCase().includes(search) ||
      item.code.toLowerCase().includes(search)
    );
  }

  if (fromDate) {

    filteredItems = filteredItems.filter(item =>
      new Date(item.createdAt) >= new Date(fromDate)
    );
  }

  if (toDate) {
    filteredItems = filteredItems.filter(item =>
      new Date(item.createdAt) <= new Date(toDate)
    );
  }

  const total = filteredItems.length;
  const startIndex = (page - 1) * limit;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + limit);

  return NextResponse.json({ total, items: paginatedItems });
}
export async function POST(req: NextRequest) {
  try {

    const { name, code, type, price }: CreateItemBody = await req.json();


    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'El nombre es obligatorio y no puede estar vacío.' }, { status: 400 });
    }

    if (!type || !allowedTypes.includes(type)) {
      return NextResponse.json({ error: `Tipo inválido. Debe ser producto o servicio.` }, { status: 400 });
    }

    if (typeof price !== 'number' || price <= 0) {
      return NextResponse.json({ error: 'El precio debe ser mayor a 0.' }, { status: 400 });
    }

    if (code) {
      const existingCode = items.find(item => item.code === code && !item.deleted);
      if (existingCode) {
        return NextResponse.json({ error: `El código '${code}' ya está en uso.` }, { status: 400 });
      }
    }
    const newItem: Item = {
      id: uuidv4(),
      name,
      code: code || uuidv4().slice(0, 8),
      type,
      price,
      createdAt: new Date().toISOString(),
      deleted: false,
      deletedAt: "",
    };
    items.push(newItem);
    return NextResponse.json(newItem, { status: 201 });

  } catch (error: unknown) {
    console.error('Error al crear ítem:', error);
    return NextResponse.json({ error: 'Error inesperado en el servidor.' }, { status: 500 });
  }
}
