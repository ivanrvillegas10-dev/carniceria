-- BORRAR TABLAS SI EXISTEN
DROP TABLE IF EXISTS ventas_detalle;
DROP TABLE IF EXISTS ventas;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS proveedor;
DROP TABLE IF EXISTS cliente;

--------------------------------------------------
-- TABLA CLIENTE
CREATE TABLE cliente (
    idcliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    telefono VARCHAR(20),
    direccion VARCHAR(150)
);

--------------------------------------------------
-- TABLA PROVEEDOR
CREATE TABLE proveedor (
    idproveedor SERIAL PRIMARY KEY,
    descripcion VARCHAR(100),
    tipo VARCHAR(50)
);

--------------------------------------------------
-- TABLA PRODUCTOS
CREATE TABLE productos (
    idproducto SERIAL PRIMARY KEY,
    descripcion VARCHAR(100),
    costo DECIMAL(10,2),
    idproveedor INT,
    FOREIGN KEY (idproveedor) REFERENCES proveedor(idproveedor)
);

--------------------------------------------------
-- TABLA VENTAS
CREATE TABLE ventas (
    idventa SERIAL PRIMARY KEY,
    fecha DATE,
    noventa VARCHAR(50),
    idcliente INT,
    subtotal DECIMAL(10,2),
    impuesto DECIMAL(10,2),
    total DECIMAL(10,2),
    FOREIGN KEY (idcliente) REFERENCES cliente(idcliente)
);

--------------------------------------------------
-- TABLA DETALLE DE VENTAS
CREATE TABLE ventas_detalle (
    idventa INT,
    idproducto INT,
    descripcion VARCHAR(100),
    cantidad INT,
    preciounidad DECIMAL(10,2),
    importe DECIMAL(10,2),
    PRIMARY KEY (idventa, idproducto),
    FOREIGN KEY (idventa) REFERENCES ventas(idventa) ON DELETE CASCADE,
    FOREIGN KEY (idproducto) REFERENCES productos(idproducto)
);

--------------------------------------------------
-- ACTIVAR RLS
ALTER TABLE cliente ENABLE ROW LEVEL SECURITY;
ALTER TABLE proveedor ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE ventas ENABLE ROW LEVEL SECURITY;
ALTER TABLE ventas_detalle ENABLE ROW LEVEL SECURITY;

--------------------------------------------------
-- BORRAR POLITICAS SI YA EXISTEN
DROP POLICY IF EXISTS cliente_select ON cliente;
DROP POLICY IF EXISTS cliente_insert ON cliente;
DROP POLICY IF EXISTS cliente_update ON cliente;
DROP POLICY IF EXISTS cliente_delete ON cliente;

DROP POLICY IF EXISTS proveedor_select ON proveedor;
DROP POLICY IF EXISTS proveedor_insert ON proveedor;
DROP POLICY IF EXISTS proveedor_update ON proveedor;
DROP POLICY IF EXISTS proveedor_delete ON proveedor;

DROP POLICY IF EXISTS productos_select ON productos;
DROP POLICY IF EXISTS productos_insert ON productos;
DROP POLICY IF EXISTS productos_update ON productos;
DROP POLICY IF EXISTS productos_delete ON productos;

DROP POLICY IF EXISTS ventas_select ON ventas;
DROP POLICY IF EXISTS ventas_insert ON ventas;
DROP POLICY IF EXISTS ventas_update ON ventas;
DROP POLICY IF EXISTS ventas_delete ON ventas;

DROP POLICY IF EXISTS detalle_select ON ventas_detalle;
DROP POLICY IF EXISTS detalle_insert ON ventas_detalle;
DROP POLICY IF EXISTS detalle_update ON ventas_detalle;
DROP POLICY IF EXISTS detalle_delete ON ventas_detalle;

--------------------------------------------------
-- POLITICAS CLIENTE
CREATE POLICY cliente_select
ON cliente
FOR SELECT
TO public
USING (true);

CREATE POLICY cliente_insert
ON cliente
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY cliente_update
ON cliente
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY cliente_delete
ON cliente
FOR DELETE
TO public
USING (true);

--------------------------------------------------
-- POLITICAS PROVEEDOR
CREATE POLICY proveedor_select
ON proveedor
FOR SELECT
TO public
USING (true);

CREATE POLICY proveedor_insert
ON proveedor
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY proveedor_update
ON proveedor
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY proveedor_delete
ON proveedor
FOR DELETE
TO public
USING (true);

--------------------------------------------------
-- POLITICAS PRODUCTOS
CREATE POLICY productos_select
ON productos
FOR SELECT
TO public
USING (true);

CREATE POLICY productos_insert
ON productos
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY productos_update
ON productos
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY productos_delete
ON productos
FOR DELETE
TO public
USING (true);

--------------------------------------------------
-- POLITICAS VENTAS
CREATE POLICY ventas_select
ON ventas
FOR SELECT
TO public
USING (true);

CREATE POLICY ventas_insert
ON ventas
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY ventas_update
ON ventas
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY ventas_delete
ON ventas
FOR DELETE
TO public
USING (true);

--------------------------------------------------
-- POLITICAS VENTAS_DETALLE
CREATE POLICY detalle_select
ON ventas_detalle
FOR SELECT
TO public
USING (true);

CREATE POLICY detalle_insert
ON ventas_detalle
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY detalle_update
ON ventas_detalle
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY detalle_delete
ON ventas_detalle
FOR DELETE
TO public
USING (true);