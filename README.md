# Proyecto 21: Carnicería Camacho

## Descripción del proyecto

Este proyecto consiste en una base de datos para la carnicería **Camacho**, creada con el propósito de organizar y administrar mejor la información del negocio.

La base de datos permite registrar productos, clientes, proveedores y ventas. También ayuda a llevar un mejor control del inventario, los precios, las cantidades disponibles y los detalles importantes de cada venta realizada.

Para desarrollar la base de datos, primero se identificaron las necesidades principales de la carnicería. Después, se diseñaron tablas para guardar la información de manera ordenada y facilitar su consulta.

La base de datos fue creada utilizando **Supabase**, una plataforma que permite almacenar datos en la nube y conectarlos con una página web mediante una API. Esto permite consultar, agregar, modificar o eliminar información desde el sitio web.

También se configuraron consultas SQL para revisar los datos almacenados, como productos registrados, ventas realizadas y totales. Gracias a esta implementación, la carnicería puede tener un mejor control de sus datos y mejorar la administración del negocio.

---

## 🛠️ Tecnologías utilizadas

* **Base de Datos:** PostgreSQL con Supabase
* **Frontend:** HTML, CSS y JavaScript Vanilla
* **Backend:** Supabase API REST y funciones SQL
* **Seguridad:** Row Level Security (RLS) y Policies
* **Despliegue:** GitHub Pages

---

## ✨ Funcionalidades principales

* Gestión de productos: altas, consultas, modificaciones y bajas
* Gestión de clientes
* Gestión de proveedores
* Registro y administración de ventas
* Operaciones CRUD completas
* Cálculo automático del impuesto del 10%
* Cálculo automático del total de venta
* Conexión en tiempo real con Supabase
* Interfaz web responsive
* Control de acceso mediante roles
* Visualización de datos almacenados en la base de datos
* Integración mediante API REST proporcionada por Supabase

---

## 🔗 Tablas principales

### Productos

* idproducto
* descripcion
* costo
* imagen
* idproveedor

### Clientes

* idcliente
* nombre
* telefono
* direccion

### Proveedores

* idproveedor
* descripcion
* tipo

### Ventas

* idventa
* fecha
* noventa
* idcliente
* subtotal
* impuesto
* total

---

## 🔒 Seguridad

El proyecto utiliza la **anon public key** de Supabase y protección mediante **Row Level Security (RLS)**.

También se configuraron **Policies** para controlar el acceso a las tablas y proteger la información almacenada en la base de datos.

### Roles de acceso

* **Administrador:** control total del sistema.
* **Profesor:** acceso de solo lectura.

---

## 👥 Usuario de acceso

### Profesor

* **Usuario:** profesor
* **Contraseña:** chocolate
* **Permisos:** solo lectura

El usuario profesor puede consultar productos, clientes, proveedores y ventas. También puede visualizar el funcionamiento general del sistema, pero no puede agregar, editar ni eliminar información.

Esta implementación permite demostrar el funcionamiento del sistema sin comprometer la integridad de los datos almacenados en la base de datos.

---

## 🌐 Demo

### Página web

https://ivanrvillegas10-dev.github.io/carniceria/

### Repositorio GitHub

https://github.com/ivanrvillegas10-dev/carniceria

### Repositorio central

https://github.com/gabrielhuav/DB-Coursework-2026-2

---

## ✅ Verificación de funcionamiento

Al abrir la aplicación en el navegador, se muestra la página principal de **Carnicería Camacho** conectada correctamente a Supabase.

Desde la página web se pueden visualizar los datos almacenados en la base de datos y comprobar el funcionamiento de las operaciones principales del sistema.

---
📸 Capturas del Proyecto

Página Principal

<img src="https://github.com/user-attachments/assets/35ec3b13-3e45-430f-b918-a2746ce77ecf" alt="Página principal" width="800"/>

Gestión de Registros

<img src="https://github.com/user-attachments/assets/288cf883-9485-49e2-8df8-5de2ba3c2fdb" alt="Gestión de registros" width="800"/>

Base de Datos Conectada

<img src="https://github.com/user-attachments/assets/cf3d4ac4-8aa1-4345-84a8-29809fb580af" alt="Base de datos conectada" width="800"/>

<img src="https://github.com/user-attachments/assets/4df50bbf-3880-4449-a040-ab3f57b17bce" alt="Imagen 4" width="800"/>

<img src="https://github.com/user-attachments/assets/b9b45dca-5a3e-4f94-94b1-6eec183b97a6" alt="Imagen 5" width="800"/>







