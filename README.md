## Descripción del proyecto

Este proyecto consiste en una base de datos para la carnicería **Camacho**, creada con el propósito de organizar y administrar mejor la información del negocio. La base de datos permite registrar productos, ventas y detalles importantes relacionados con el inventario.
Para desarrollar la base de datos, primero se identificaron las necesidades principales de la carnicería, como llevar un control de los productos disponibles, sus precios, cantidades y las ventas realizadas. Después, se diseñaron tablas para guardar esta información de manera ordenada.
La base de datos fue creada utilizando **Supabase**, una plataforma que permite almacenar datos en la nube y conectarlos con una página web mediante una API. Esto facilita que la información pueda consultarse, agregarse o actualizarse desde el sitio web.
También se configuraron consultas SQL para revisar la información almacenada, como productos registrados, ventas realizadas y totales. Gracias a esta base de datos, la carnicería puede tener un mejor control de sus datos y mejorar la administración del negocio.

🛠️ Tecnologías
Base de Datos: PostgreSQL (Supabase)
Frontend: HTML, CSS y JavaScript Vanilla
Backend: Supabase API REST y funciones SQL
Seguridad: Row Level Security (RLS) y Policies
Despliegue: GitHub Pages
✨ Funcionalidades
Gestión de productos (altas, consultas, modificaciones y bajas)
Gestión de clientes
Gestión de proveedores
Registro y administración de ventas
Operaciones CRUD completas
Cálculo automático del impuesto (10%)
Cálculo automático del total de venta
Conexión en tiempo real con Supabase
Interfaz web responsive
Control de acceso mediante roles (Administrador y Profesor)
Visualización de datos almacenados en la base de datos
Integración mediante API REST proporcionada por Supabase
 Verifica que funciona

La aplicación se abrirá en tu navegador y mostrará la página principal de Carnicería Camacho conectada a Supabase.

https://ivanrvillegas10-dev.github.io/carniceria/

🔗 Tablas principales
Productos
idproducto
descripcion
costo
imagen
idproveedor
Clientes
idcliente
nombre
telefono
direccion
Proveedores
idproveedor
descripcion
tipo
Ventas
idventa
fecha
noventa
idcliente
subtotal
impuesto
total
🔒 Seguridad
Uso de anon public key de Supabase
Protección mediante Row Level Security (RLS)
Policies para controlar acceso a las tablas
Roles de acceso:
Administrador (control total)
Profesor (solo lectura)

👥 Usuarios de acceso

Usuario: profesor
Contraseña: chocolate
Permisos:
Consultar productos, clientes, proveedores y ventas.
Visualizar el funcionamiento general del sistema.
No puede agregar, editar ni eliminar información.

Esta implementación permite demostrar el funcionamiento del sistema sin comprometer la integridad de los datos almacenados en la base de datos.

🌐 Demo

Página Web:
https://ivanrvillegas10-dev.github.io/carniceria/

Repositorio GitHub:
https://github.com/ivanrvillegas10-dev/carniceria

Repositorio Central:

https://github.com/gabrielhuav/DB-Coursework-2026-2

IMAGENES 

<img src="https://github.com/user-attachments/assets/35ec3b13-3e45-430f-b918-a2746ce77ecf" alt="Imagen 1" width="800"/>

<img src="https://github.com/user-attachments/assets/288cf883-9485-49e2-8df8-5de2ba3c2fbd" alt="Imagen 2" width="800"/>

<img src="https://github.com/user-attachments/assets/cf3d4ac4-8aa1-4345-84a8-298096fb80af" alt="Imagen 3" width="800"/>











