/* ============================================================
   CARGA DE DATOS Y CONFIGURACIÓN INICIAL
   ============================================================ */

let data = [];
let tematicas = [];

/**
 * Inicializa el proyecto:
 * - Carga el JSON
 * - Obtiene temáticas únicas
 * - Renderiza el menú lateral
 * - Activa el control del sidebar móvil
 */
async function init() {
  const res = await fetch("data/cuadro_completo.json");
  data = await res.json();

  // Obtener lista única de temáticas
  tematicas = [...new Set(data.map(item => item.Tematica))];

  renderTemas();
  activarSidebarMovil();
}

/* ============================================================
   RENDERIZADO DEL MENÚ DE TEMÁTICAS
   ============================================================ */

/**
 * Genera la lista lateral de temáticas.
 * Cada temática se convierte en un botón seleccionable.
 */
function renderTemas() {
  const ul = document.getElementById("temasList");
  ul.innerHTML = "";

  tematicas.forEach(t => {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-action";
    li.textContent = t;

    li.onclick = () => {
      mostrarTema(t);

      // En móvil: cerrar menú al seleccionar un tema
      if (window.innerWidth < 768) {
        document.getElementById("sidebar").classList.remove("activo");
      }
    };

    ul.appendChild(li);
  });
}

/* ============================================================
   VISUALIZACIÓN DE PROPUESTAS POR TEMÁTICA
   ============================================================ */

/**
 * Muestra el contenido asociado a la temática seleccionada:
 * - Cambia el título
 * - Renderiza tarjetas por candidato
 */
function mostrarTema(tema) {
  document.getElementById("tituloTema").textContent = tema;

  const cont = document.getElementById("propuestasContainer");
  cont.innerHTML = "";

  const propuestas = data.filter(item => item.Tematica === tema);

  propuestas.forEach(p => {
    cont.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">${p.Candidato}</h5>
            <p class="card-text">${p.Propuesta}</p>
          </div>
        </div>
      </div>
    `;
  });

  marcarTemaActivo(tema);
}

/* ============================================================
   MARCAR TEMÁTICA SELECCIONADA EN EL SIDEBAR
   ============================================================ */

/**
 * Resalta visualmente la temática activa en el menú.
 */
function marcarTemaActivo(nombre) {
  document.querySelectorAll("#temasList li")
    .forEach(li => li.classList.toggle("active", li.textContent === nombre));
}

/* ============================================================
   CONTROL DEL SIDEBAR EN DISPOSITIVOS MÓVILES
   ============================================================ */

/**
 * Activa el comportamiento del sidebar móvil:
 * - Muestra/oculta menú lateral al tocar el botón hamburguesa
 */
function activarSidebarMovil() {
  const btn = document.getElementById("toggleSidebar");
  const sidebar = document.getElementById("sidebar");

  if (!btn) return; // Seguridad: botón solo existe en móvil

  btn.addEventListener("click", () => {
    sidebar.classList.toggle("activo");
  });
}

/* ============================================================
   EJECUTAR APLICACIÓN
   ============================================================ */

init();
