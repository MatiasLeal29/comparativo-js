async function cargarTabla() {
  const res = await fetch("data/cuadro_completo.json");
  const data = await res.json();
  const tbody = document.getElementById("contenidoTabla");
  data.forEach(row => {
    tbody.innerHTML += `
      <tr>
        <td>${row.Tematica}</td>
        <td>${row.Candidato}</td>
        <td>${row.Propuesta}</td>
      </tr>
    `;
  });
  new DataTable('#tablaCandidatos', {
    pageLength: 10,
    lengthMenu: [10, 20, 50, 100],
    language: { url: "https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json" }
  });
}
cargarTabla();