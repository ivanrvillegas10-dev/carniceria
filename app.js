const supabaseUrl = "https://qfuqlxhqlthtzsadzbvd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmdXFseGhxbHRodHpzYWR6YnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NjE1MDgsImV4cCI6MjA5MDEzNzUwOH0.toXW4FsL6HRW2TWAidq0Ra3oZ_x-7pK9ytvRtftIFds";

const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);

const imagenDefault =
  "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f";

const productosDiv = document.getElementById("productos");
const clientesDiv = document.getElementById("clientes");
const proveedoresDiv = document.getElementById("proveedores");
const ventasDiv = document.getElementById("ventas");

// PRODUCTOS
async function cargarProductos() {
  const { data, error } = await client
    .from("productos")
    .select("*")
    .order("idproducto", { ascending: true });

  if (error) {
    console.log(error);
    alert("Error al cargar productos");
    return;
  }

  productosDiv.innerHTML = "";

  data.forEach((p) => {
    const imagen = p.imagen ? p.imagen : imagenDefault;

    productosDiv.innerHTML += `
      <div class="card">
        <img src="${imagen}" alt="${p.descripcion}">
        <div class="card-content">
          <h3>${p.descripcion}</h3>
          <p class="price">$${Number(p.costo).toFixed(2)}</p>

          <button class="editar" onclick="editarProducto(${p.idproducto}, '${p.descripcion}', ${p.costo})">
            Editar
          </button>

          <button class="eliminar" onclick="eliminarProducto(${p.idproducto})">
            Eliminar
          </button>
        </div>
      </div>
    `;
  });
}

async function agregarProducto() {
  const descripcion = prompt("Nombre del producto:");
  const costo = prompt("Costo:");
  const imagen = prompt("Link de imagen:");
  const idproveedor = prompt("ID del proveedor:");

  if (!descripcion || !costo || !idproveedor) {
    alert("Completa los campos obligatorios.");
    return;
  }

  const { error } = await client
    .from("productos")
    .insert([
      {
        descripcion,
        costo: Number(costo),
        imagen,
        idproveedor: Number(idproveedor)
      }
    ]);

  if (error) {
    console.log(error);
    alert("Error al agregar producto");
  } else {
    cargarProductos();
  }
}

async function editarProducto(id, descripcion, costo) {
  const nuevaDescripcion = prompt("Nueva descripción:", descripcion);
  const nuevoCosto = prompt("Nuevo costo:", costo);

  if (!nuevaDescripcion || !nuevoCosto) return;

  const { error } = await client
    .from("productos")
    .update({
      descripcion: nuevaDescripcion,
      costo: Number(nuevoCosto)
    })
    .eq("idproducto", id);

  if (error) {
    console.log(error);
    alert("Error al editar producto");
  } else {
    cargarProductos();
  }
}

async function eliminarProducto(id) {
  if (!confirm("¿Eliminar producto?")) return;

  const { error } = await client
    .from("productos")
    .delete()
    .eq("idproducto", id);

  if (error) {
    console.log(error);
    alert("Error al eliminar producto");
  } else {
    cargarProductos();
  }
}

// CLIENTES
async function cargarClientes() {
  const { data, error } = await client
    .from("cliente")
    .select("*")
    .order("idcliente", { ascending: true });

  if (error) {
    console.log(error);
    alert("Error al cargar clientes");
    return;
  }

  clientesDiv.innerHTML = "";

  data.forEach((c) => {
    clientesDiv.innerHTML += `
      <div class="item">
        <strong>${c.nombre}</strong><br>
        Teléfono: ${c.telefono}<br>
        Dirección: ${c.direccion}<br><br>

        <button class="editar" onclick="editarCliente(${c.idcliente}, '${c.nombre}', '${c.telefono}', '${c.direccion}')">
          Editar
        </button>

        <button class="eliminar" onclick="eliminarCliente(${c.idcliente})">
          Eliminar
        </button>
      </div>
    `;
  });
}

async function agregarCliente() {
  const nombre = prompt("Nombre:");
  const telefono = prompt("Teléfono:");
  const direccion = prompt("Dirección:");

  if (!nombre || !telefono || !direccion) {
    alert("Completa todos los campos.");
    return;
  }

  const { error } = await client
    .from("cliente")
    .insert([{ nombre, telefono, direccion }]);

  if (error) {
    console.log(error);
    alert("Error al agregar cliente");
  } else {
    cargarClientes();
  }
}

async function editarCliente(id, nombre, telefono, direccion) {
  const nuevoNombre = prompt("Nombre:", nombre);
  const nuevoTelefono = prompt("Teléfono:", telefono);
  const nuevaDireccion = prompt("Dirección:", direccion);

  if (!nuevoNombre || !nuevoTelefono || !nuevaDireccion) return;

  const { error } = await client
    .from("cliente")
    .update({
      nombre: nuevoNombre,
      telefono: nuevoTelefono,
      direccion: nuevaDireccion
    })
    .eq("idcliente", id);

  if (error) {
    console.log(error);
    alert("Error al editar cliente");
  } else {
    cargarClientes();
  }
}

async function eliminarCliente(id) {
  if (!confirm("¿Eliminar cliente?")) return;

  const { error } = await client
    .from("cliente")
    .delete()
    .eq("idcliente", id);

  if (error) {
    console.log(error);
    alert("Error al eliminar cliente");
  } else {
    cargarClientes();
  }
}

// PROVEEDORES
async function cargarProveedores() {
  const { data, error } = await client
    .from("proveedor")
    .select("*")
    .order("idproveedor", { ascending: true });

  if (error) {
    console.log(error);
    alert("Error al cargar proveedores");
    return;
  }

  proveedoresDiv.innerHTML = "";

  data.forEach((p) => {
    proveedoresDiv.innerHTML += `
      <div class="item">
        <strong>${p.descripcion}</strong><br>
        Tipo: ${p.tipo}<br><br>

        <button class="editar" onclick="editarProveedor(${p.idproveedor}, '${p.descripcion}', '${p.tipo}')">
          Editar
        </button>

        <button class="eliminar" onclick="eliminarProveedor(${p.idproveedor})">
          Eliminar
        </button>
      </div>
    `;
  });
}

async function agregarProveedor() {
  const descripcion = prompt("Proveedor:");
  const tipo = prompt("Tipo:");

  if (!descripcion || !tipo) {
    alert("Completa todos los campos.");
    return;
  }

  const { error } = await client
    .from("proveedor")
    .insert([{ descripcion, tipo }]);

  if (error) {
    console.log(error);
    alert("Error al agregar proveedor");
  } else {
    cargarProveedores();
  }
}

async function editarProveedor(id, descripcion, tipo) {
  const nuevaDescripcion = prompt("Proveedor:", descripcion);
  const nuevoTipo = prompt("Tipo:", tipo);

  if (!nuevaDescripcion || !nuevoTipo) return;

  const { error } = await client
    .from("proveedor")
    .update({
      descripcion: nuevaDescripcion,
      tipo: nuevoTipo
    })
    .eq("idproveedor", id);

  if (error) {
    console.log(error);
    alert("Error al editar proveedor");
  } else {
    cargarProveedores();
  }
}

async function eliminarProveedor(id) {
  if (!confirm("¿Eliminar proveedor?")) return;

  const { error } = await client
    .from("proveedor")
    .delete()
    .eq("idproveedor", id);

  if (error) {
    console.log(error);
    alert("Error al eliminar proveedor");
  } else {
    cargarProveedores();
  }
}

// VENTAS
async function cargarVentas() {
  const { data, error } = await client
    .from("ventas")
    .select("*")
    .order("idventa", { ascending: true });

  if (error) {
    console.log(error);
    alert("Error al cargar ventas");
    return;
  }

  ventasDiv.innerHTML = "";

  data.forEach((v) => {
    ventasDiv.innerHTML += `
      <div class="item">
        <strong>Venta: ${v.noventa}</strong><br>
        Fecha: ${v.fecha}<br>
        Cliente ID: ${v.idcliente}<br>
        Subtotal: $${Number(v.subtotal).toFixed(2)}<br>
        Impuesto: $${Number(v.impuesto).toFixed(2)}<br>
        Total: $${Number(v.total).toFixed(2)}<br><br>

        <button class="editar" onclick="editarVenta(${v.idventa}, '${v.fecha}', '${v.noventa}', ${v.idcliente}, ${v.subtotal}, ${v.impuesto}, ${v.total})">
          Editar
        </button>

        <button class="eliminar" onclick="eliminarVenta(${v.idventa})">
          Eliminar
        </button>
      </div>
    `;
  });
}

async function agregarVenta() {
  const fecha = prompt("Fecha (YYYY-MM-DD):");
  const noventa = prompt("Número de venta:");
  const idcliente = prompt("ID del cliente:");
  const subtotal = prompt("Subtotal:");
  const impuesto = prompt("Impuesto:");
  const total = prompt("Total:");

  if (!fecha || !noventa || !idcliente || !subtotal || !impuesto || !total) {
    alert("Completa todos los campos.");
    return;
  }

  const { error } = await client
    .from("ventas")
    .insert([
      {
        fecha,
        noventa,
        idcliente: Number(idcliente),
        subtotal: Number(subtotal),
        impuesto: Number(impuesto),
        total: Number(total)
      }
    ]);

  if (error) {
    console.log(error);
    alert("Error al agregar venta");
  } else {
    cargarVentas();
  }
}

async function editarVenta(id, fecha, noventa, idcliente, subtotal, impuesto, total) {
  const nuevaFecha = prompt("Fecha:", fecha);
  const nuevaNoVenta = prompt("Número de venta:", noventa);
  const nuevoCliente = prompt("ID cliente:", idcliente);
  const nuevoSubtotal = prompt("Subtotal:", subtotal);
  const nuevoImpuesto = prompt("Impuesto:", impuesto);
  const nuevoTotal = prompt("Total:", total);

  if (!nuevaFecha || !nuevaNoVenta || !nuevoCliente || !nuevoSubtotal || !nuevoImpuesto || !nuevoTotal) return;

  const { error } = await client
    .from("ventas")
    .update({
      fecha: nuevaFecha,
      noventa: nuevaNoVenta,
      idcliente: Number(nuevoCliente),
      subtotal: Number(nuevoSubtotal),
      impuesto: Number(nuevoImpuesto),
      total: Number(nuevoTotal)
    })
    .eq("idventa", id);

  if (error) {
    console.log(error);
    alert("Error al editar venta");
  } else {
    cargarVentas();
  }
}

async function eliminarVenta(id) {
  if (!confirm("¿Eliminar venta?")) return;

  const { error } = await client
    .from("ventas")
    .delete()
    .eq("idventa", id);

  if (error) {
    console.log(error);
    alert("Error al eliminar venta");
  } else {
    cargarVentas();
  }
}

// CARGAR TODO
cargarProductos();
cargarClientes();
cargarProveedores();
cargarVentas();