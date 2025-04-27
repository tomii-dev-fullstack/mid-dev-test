import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen gap-16 p-20">
      <h1 className="text-4xl font-bold">Bienvenido a la tienda</h1>
      <Link href="/items" className="text-blue-500 underline">
        Ver listado de productos
      </Link>
    </div>
  );
}
