const url = "rifa-vale-back-end.vercel.app/data"; // URL de la API que devuelve la lista de clientes

// Función para obtener la lista de clientes desde el servidor
const fetchClients = async () => {
  try {
    const response = await fetch(url);

    const clients = await response.json();
    generateClientTable(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
  }
};

// Función para generar la tabla de clientes
const generateClientTable = (clients) => {
  const table = document.querySelector("table");

  // Crear la fila de encabezados
  const headerRow = document.createElement("tr");
  ["Nombre", "Teléfono", "Opción 1", "Opción 2"].forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Crear las filas de datos
  clients.forEach((client) => {
    const row = document.createElement("tr");

    // Añadir cada propiedad del cliente en una celda
    const cellName = document.createElement("td");
    cellName.textContent = client.name;
    row.appendChild(cellName);

    const cellTel = document.createElement("td");
    cellTel.textContent = client.tel;
    row.appendChild(cellTel);

    const cellOpc1 = document.createElement("td");
    cellOpc1.textContent = client.opc1;
    row.appendChild(cellOpc1);

    const cellOpc2 = document.createElement("td");
    cellOpc2.textContent = client.opc2;
    row.appendChild(cellOpc2);

    table.appendChild(row);
  });
};

// Llamar a la función fetchClients una vez que el contenido esté cargado
document.addEventListener("DOMContentLoaded", fetchClients);
