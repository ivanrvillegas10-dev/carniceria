const supabaseUrl = "https://qfuqlxhqlthtzsadzbvd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmdXFseGhxbHRodHpzYWR6YnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NjE1MDgsImV4cCI6MjA5MDEzNzUwOH0.toXW4FsL6HRW2TWAidq0Ra3oZ_x-7pK9ytvRtftIFds";

const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);

let rolUsuario = "";

const imagenDefault = "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f";

const productosDiv = document.getElementById("productos");
const clientesDiv = document.getElementById("clientes");
const proveedoresDiv = document.getElementById("proveedores");
const ventasDiv = document.getElementById("ventas");

function login() {
  console.log("Login ejecutado");
  
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  if (usuario === "admin" && password === "carniceria2025") {
    rolUsuario = "admin";
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("rolTexto").innerText = "Administrador";
    mostrarAdmin();
    cargarTodo();
  } else if (usuario === "profesor" && password === "chocolate") {
    rolUsuario = "profesor";
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("rolTexto").innerText = "Profesor - Solo lectura";
    ocultarAdmin();
    cargarTodo();
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

function cerrarSesion() {
  rolUsuario = "";
  document.getElementById("loginBox").style.display = "flex";
  document.getElementById("rolTexto").innerText = "Sin iniciar sesión";
  ocultarAdmin();

  productosDiv.innerHTML = "";
  clientesDiv.innerHTML = "";
  proveedoresDiv.innerHTML = "";
  ventasDiv.innerHTML = "";
}

function esAdmin() {
  return rolUsuario === "admin";
}

function mostrarAdmin() {
  document.querySelectorAll(".admin-only").forEach(el => {
    el.style.display = "block";
  });
}

function ocultarAdmin() {
  document.querySelectorAll(".admin-only").forEach(el => {
    el.style.display = "none";
  });
}

function cargarTodo() {
  cargarProductos();
  cargarClientes();
  cargarProveedores();
  cargarVentas();
}

// PRODUCTOS
async function cargarProductos() {
  const { data, error } = await client
    .from("productos")
    .select("*")
    .order("idproducto", { ascending: true });

  if (error) return console.log(error);

  productosDiv.innerHTML = "";

  data.forEach(p => {
    productosDiv.innerHTML += `
      <div class="card">
        <img src="${p.imagen || imagenDefault}">
        <div class="card-content">
          <h3>${p.descripcion}</h3>
          <p class="price">$${Number(p.costo).toFixed(2)}</p>

          ${esAdmin() ? `
          <button class="editar" onclick="editarProducto(${p.idproducto}, '${p.descripcion}', ${p.costo})">
            Editar
          </button>

          <button class="eliminar" onclick="eliminarProducto(${p.idproducto})">
            Eliminar
          </button>
          ` : ""}
        </div>
      </div>
    `;
  });
}

async function agregarProducto() {
  if (!esAdmin()) {
    alert("Solo el administrador puede agregar productos.");
    return;
  }

  const descripcion = document.getElementById("productoDescripcion").value;
  const costo = document.getElementById("productoCosto").value;
  const imagen = document.getElementById("productoImagen").value;
  const idproveedor = document.getElementById("productoProveedor").value;

  if (!descripcion || !costo || !idproveedor) {
    alert("Completa producto, costo e ID proveedor");
    return;
  }

  const { error } = await client.from("productos").insert([{
    descripcion,
    costo: Number(costo),
    imagen,
    idproveedor: Number(idproveedor)
  }]);

  if (error) {
    console.log(error);
    alert("Error al guardar producto");
  } else {
    document.getElementById("productoDescripcion").value = "";
    document.getElementById("productoCosto").value = "";
    document.getElementById("productoImagen").value = "";
    document.getElementById("productoProveedor").value = "";
    cargarProductos();
  }
}

async function editarProducto(id, descripcion, costo) {
  if (!esAdmin()) {
    alert("Solo el administrador puede editar productos.");
    return;
  }

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

  if (error) console.log(error);
  else cargarProductos();
}

async function eliminarProducto(id) {
  if (!esAdmin()) {
    alert("Solo el administrador puede eliminar productos.");
    return;
  }

  if (!confirm("¿Eliminar producto?")) return;

  const { error } = await client
    .from("productos")
    .delete()
    .eq("idproducto", id);

  if (error) console.log(error);
  else cargarProductos();
}

// CLIENTES
async function cargarClientes() {
  const { data, error } = await client
    .from("cliente")
    .select("*")
    .order("idcliente", { ascending: true });

  if (error) return console.log(error);

  clientesDiv.innerHTML = "";

  data.forEach(c => {
    clientesDiv.innerHTML += `
      <div class="item">
        <strong>${c.nombre}</strong><br>
        Teléfono: ${c.telefono}<br>
        Dirección: ${c.direccion}<br><br>

        ${esAdmin() ? `
        <button class="editar" onclick="editarCliente(${c.idcliente}, '${c.nombre}', '${c.telefono}', '${c.direccion}')">
          Editar
        </button>

        <button class="eliminar" onclick="eliminarCliente(${c.idcliente})">
          Eliminar
        </button>
        ` : ""}
      </div>
    `;
  });
}

async function agregarCliente() {
  if (!esAdmin()) {
    alert("Solo el administrador puede agregar clientes.");
    return;
  }

  const nombre = document.getElementById("clienteNombre").value;
  const telefono = document.getElementById("clienteTelefono").value;
  const direccion = document.getElementById("clienteDireccion").value;

  if (!nombre || !telefono || !direccion) {
    alert("Completa todos los campos del cliente");
    return;
  }

  const { error } = await client.from("cliente").insert([{ nombre, telefono, direccion }]);

  if (error) {
    console.log(error);
    alert("Error al guardar cliente");
  } else {
    document.getElementById("clienteNombre").value = "";
    document.getElementById("clienteTelefono").value = "";
    document.getElementById("clienteDireccion").value = "";
    cargarClientes();
  }
}

async function editarCliente(id, nombre, telefono, direccion) {
  if (!esAdmin()) {
    alert("Solo el administrador puede editar clientes.");
    return;
  }

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

  if (error) console.log(error);
  else cargarClientes();
}

async function eliminarCliente(id) {
  if (!esAdmin()) {
    alert("Solo el administrador puede eliminar clientes.");
    return;
  }

  if (!confirm("¿Eliminar cliente?")) return;

  const { error } = await client
    .from("cliente")
    .delete()
    .eq("idcliente", id);

  if (error) console.log(error);
  else cargarClientes();
}

// PROVEEDORES
async function cargarProveedores() {
  const { data, error } = await client
    .from("proveedor")
    .select("*")
    .order("idproveedor", { ascending: true });

  if (error) return console.log(error);

  proveedoresDiv.innerHTML = "";

  data.forEach(p => {
    proveedoresDiv.innerHTML += `
      <div class="item">
        <strong>${p.descripcion}</strong><br>
        Tipo: ${p.tipo}<br><br>

        ${esAdmin() ? `
        <button class="editar" onclick="editarProveedor(${p.idproveedor}, '${p.descripcion}', '${p.tipo}')">
          Editar
        </button>

        <button class="eliminar" onclick="eliminarProveedor(${p.idproveedor})">
          Eliminar
        </button>
        ` : ""}
      </div>
    `;
  });
}

async function agregarProveedor() {
  if (!esAdmin()) {
    alert("Solo el administrador puede agregar proveedores.");
    return;
  }

  const descripcion = document.getElementById("proveedorDescripcion").value;
  const tipo = document.getElementById("proveedorTipo").value;

  if (!descripcion || !tipo) {
    alert("Completa todos los campos del proveedor");
    return;
  }

  const { error } = await client.from("proveedor").insert([{ descripcion, tipo }]);

  if (error) {
    console.log(error);
    alert("Error al guardar proveedor");
  } else {
    document.getElementById("proveedorDescripcion").value = "";
    document.getElementById("proveedorTipo").value = "";
    cargarProveedores();
  }
}

async function editarProveedor(id, descripcion, tipo) {
  if (!esAdmin()) {
    alert("Solo el administrador puede editar proveedores.");
    return;
  }

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

  if (error) console.log(error);
  else cargarProveedores();
}

async function eliminarProveedor(id) {
  if (!esAdmin()) {
    alert("Solo el administrador puede eliminar proveedores.");
    return;
  }

  if (!confirm("¿Eliminar proveedor?")) return;

  const { error } = await client
    .from("proveedor")
    .delete()
    .eq("idproveedor", id);

  if (error) console.log(error);
  else cargarProveedores();
}

// VENTAS
async function cargarVentas() {
  const { data, error } = await client
    .from("ventas")
    .select("*")
    .order("idventa", { ascending: true });

  if (error) return console.log(error);

  ventasDiv.innerHTML = "";

  data.forEach(v => {
    ventasDiv.innerHTML += `
      <div class="item">
        <strong>Venta: ${v.noventa}</strong><br>
        Fecha: ${v.fecha}<br>
        Cliente ID: ${v.idcliente}<br>
        Subtotal: $${Number(v.subtotal).toFixed(2)}<br>
        Impuesto: $${Number(v.impuesto).toFixed(2)}<br>
        Total: $${Number(v.total).toFixed(2)}<br><br>

        ${esAdmin() ? `
        <button class="editar" onclick="editarVenta(${v.idventa}, '${v.fecha}', '${v.noventa}', ${v.idcliente}, ${v.subtotal})">
          Editar
        </button>

        <button class="eliminar" onclick="eliminarVenta(${v.idventa})">
          Eliminar
        </button>
        ` : ""}
      </div>
    `;
  });
}

async function agregarVenta() {
  if (!esAdmin()) {
    alert("Solo el administrador puede agregar ventas.");
    return;
  }

  const fecha = document.getElementById("ventaFecha").value;
  const noventa = document.getElementById("ventaNumero").value;
  const idcliente = document.getElementById("ventaCliente").value;
  const subtotal = document.getElementById("ventaSubtotal").value;

  if (!fecha || !noventa || !idcliente || !subtotal) {
    alert("Completa todos los campos de venta");
    return;
  }

  const { error } = await client.from("ventas").insert([{
    fecha,
    noventa,
    idcliente: Number(idcliente),
    subtotal: Number(subtotal)
  }]);

  if (error) {
    console.log(error);
    alert("Error al guardar venta");
  } else {
    document.getElementById("ventaFecha").value = "";
    document.getElementById("ventaNumero").value = "";
    document.getElementById("ventaCliente").value = "";
    document.getElementById("ventaSubtotal").value = "";
    cargarVentas();
  }
}

async function editarVenta(id, fecha, noventa, idcliente, subtotal) {
  if (!esAdmin()) {
    alert("Solo el administrador puede editar ventas.");
    return;
  }

  const nuevaFecha = prompt("Fecha:", fecha);
  const nuevaNoVenta = prompt("Número de venta:", noventa);
  const nuevoCliente = prompt("ID cliente:", idcliente);
  const nuevoSubtotal = prompt("Subtotal:", subtotal);

  if (!nuevaFecha || !nuevaNoVenta || !nuevoCliente || !nuevoSubtotal) return;

  const { error } = await client
    .from("ventas")
    .update({
      fecha: nuevaFecha,
      noventa: nuevaNoVenta,
      idcliente: Number(nuevoCliente),
      subtotal: Number(nuevoSubtotal)
    })
    .eq("idventa", id);

  if (error) console.log(error);
  else cargarVentas();
}

async function eliminarVenta(id) {
  if (!esAdmin()) {
    alert("Solo el administrador puede eliminar ventas.");
    return;
  }

  if (!confirm("¿Eliminar venta?")) return;

  const { error } = await client
    .from("ventas")
    .delete()
    .eq("idventa", id);

  if (error) console.log(error);
  else cargarVentas();
}

ocultarAdmin();
