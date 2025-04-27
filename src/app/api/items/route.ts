import { NextRequest, NextResponse } from 'next/server';
import items from '@/lib/db.json';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get('type');
  const search = searchParams.get('search')?.toLowerCase();
  const fromDate = searchParams.get('fromDate');
  const toDate = searchParams.get('toDate');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '5', 10);

  let filteredItems = items.filter(item => !item.deleted);

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
  const { name, code, type, price } = await req.json();

  if (!name || !type || !price) {
    return NextResponse.json({ error: 'Campos requeridos faltantes.' }, { status: 400 });
  }

  const newItem = {
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
  return NextResponse.json(newItem);
}
