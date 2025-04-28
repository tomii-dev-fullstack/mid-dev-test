import { NextRequest, NextResponse } from 'next/server';
import items from '../../../../lib/db.json';
import { ItemUpdateData, Params } from './types';

export async function GET(_: NextRequest, { params }: Params) {
  const item = items.find(i => i.id === params.id && !i.deleted);
  if (!item) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const body: Partial<ItemUpdateData> = await req.json();
  const { id } = params;
  const { name, type, price, code } = body;

  if (!name || !type || price === undefined || !code) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }

  const index = items.findIndex(i => i.id === id && !i.deleted);
  if (index === -1) {
    return NextResponse.json({ error: 'Item no encontrado' }, { status: 404 });
  }

  items[index] = {
    ...items[index],
    name,
    type,
    price,
    code
  };

  return NextResponse.json(items[index]);
}
export async function DELETE(_: NextRequest, { params }: Params) {

  const index = items.findIndex(i => i.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Ítem no encontrado' }, { status: 404 });
  }

  if (items[index].deleted) {
    return NextResponse.json({ error: 'Ítem ya está eliminado' }, { status: 400 });
  }

  items[index].deleted = true;
  items[index].deletedAt = new Date().toISOString();

  return NextResponse.json(
    { success: true, message: 'Ítem eliminado correctamente', item: items[index] },

    { status: 200 }
  );
}