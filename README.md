📦 Proyecto Next.js 14 — Gestión de Ítems
Proyecto desarrollado en Next.js 14 con App Router, TypeScript y Material UI para gestionar productos y servicios, permitiendo crear, listar, editar y eliminar ítems.

🚀 Instalación y ejecución
1️⃣ Clonar el repositorio:

git clone https://github.com/tomii-dev-fullstack/mid-dev-test

cd mid-dev-test

2️⃣ Instalar dependencias:


npm install

3️⃣ Ejecutar el servidor de desarrollo:


npm run dev
4️⃣ Abrir en el navegador:

http://localhost:3000

🗂️ Estructura del proyecto

La estructura se basa en App Router de Next.js 14 como indica el requerimiento con la siguiente estructura

/src
  /app
    /add                  # Formulario de alta
    /api
        /items            # API Routes
          /[id]
    /fonts                # Fuentes personalizadas
    /items                # Listado y creación
       /[id]
         /edit            # CRUD por id
  /components             # Componentes reutilizables
    /button
    /filters
    /form
    /input
    /modal
    /select
  /lib                    # Configuración de componentes de formulario, base de datos y constante de api
  /models                 # Tipado TypeScript de entidades generales
  /utils                  # Funciones utilitarias
/public                   # Recursos estáticos


⚙️ Decisiones técnicas y arquitectónicas
  
✅ Next.js 14 App Router: permite estructurar las rutas por dominio funcional, aprovechar las ventajas de server components y API routes integradas.

✅ TypeScript: para tipado estricto, mayor mantenibilidad y detección temprana de errores en desarrollo.

✅ Material UI: para una UI moderna

✅ API routes locales para operaciones CRUD sobre una base de datos(db.json).

✅ Persistencia temporal simulada para foco en front-end y arquitectura modular, fácilmente reemplazable por una API real.

📌 Requisitos

Next.js ^14

TypeScript

Material UI
