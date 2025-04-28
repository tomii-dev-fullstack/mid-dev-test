📦 Proyecto Next.js 14 — Gestión de ítems

Proyecto desarrollado en Next.js 14 con App Router, TypeScript y Material UI para gestionar productos y servicios, permitiendo crear, listar, editar y eliminar ítems.

CRUD construido en Next.js con App Router, TypeScript y MUI, priorizando una arquitectura descomponetizada y consistente en su usabilidad. Se buscó minimizar el uso de client components para optimizar la performance, aprovechando al máximo el renderizado en servidor (SSR) y la modularidad del framework.

🚀 Instalación y ejecución

1️⃣ Clonar el repositorio:

git clone https://github.com/tomii-dev-fullstack/mid-dev-test

cd mid-dev-test

2️⃣ Instalar dependencias:

npm install

3️⃣ Ejecutar el servidor de desarrollo:

npm run dev

4️⃣ Abrir en el navegador:

http://localhost:3000   - se puede cambiar el puerto en el archivo -> /lib/api.ts.

⚙️ Decisiones técnicas y arquitectónicas

  

✅ Next.js 14 App Router: permite estructurar las rutas por dominio funcional, aprovechar las ventajas de server components y API routes integradas.

✅ TypeScript: para tipado estricto, mayor mantenibilidad y detección temprana de errores en desarrollo.

✅ Material UI: para una UI moderna.

✅ API routes locales para operaciones CRUD sobre una base de datos (db.json).

✅ Persistencia temporal simulada para foco en front-end y arquitectura modular, fácilmente reemplazable por una API real.

📌 Requisitos técnicos

Next.js 14 (App Router)

TypeScript

Material UI (v.6.1.7)
