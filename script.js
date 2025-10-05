const formResiduo = document.getElementById('residuoForm');
const formLogin = document.getElementById('loginForm');
const list = document.getElementById('residuosList');
const bienvenida = document.getElementById('bienvenida');
const totalPuntos = document.getElementById('totalPuntos');

let usuario = localStorage.getItem('usuario') || '';
let residuos = JSON.parse(localStorage.getItem('residuos')) || [];

// Ponderación de puntos por tipo
const puntosPorTipo = {
  'Plástico': 5,
  'Vidrio': 3,
  'Papel': 2,
  'Metal': 4
};

// Mostrar saludo
if (usuario) {
  bienvenida.textContent = `👋 Bienvenido, ${usuario}`;
}

// Login local simulado
formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  usuario = document.getElementById('usuario').value.trim();
  localStorage.setItem('usuario', usuario);
  bienvenida.textContent = `👋 Bienvenido, ${usuario}`;
  formLogin.reset();
});

// Mostrar residuos
function mostrarResiduos() {
  list.innerHTML = '';
  if (residuos.length === 0) {
    list.innerHTML = '<p style="text-align:center;opacity:0.7;">No hay recolecciones programadas.</p>';
    totalPuntos.textContent = '';
    return;
  }

  let puntosTotales = 0;
  residuos.forEach((r, index) => {
    const puntos = r.cantidad * puntosPorTipo[r.tipo];
    puntosTotales += puntos;

    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${r.tipo}</strong> - ${r.cantidad} kg
        <br><small>📅 ${r.fecha} ⏰ ${r.hora}</small>
      </div>
      <div>
        <span class="badge">+${puntos} pts</span>
        <button title="Eliminar">🗑️</button>
      </div>
    `;
    li.querySelector('button').onclick = () => eliminarResiduo(index);
    list.appendChild(li);
  });

  totalPuntos.textContent = `🌿 Puntos acumulados: ${puntosTotales}`;
}

function eliminarResiduo(index) {
  residuos.splice(index, 1);
  guardar();
  mostrarResiduos();
}

function guardar() {
  localStorage.setItem('residuos', JSON.stringify(residuos));
}

formResiduo.addEventListener('submit', (e) => {
  e.preventDefault();
  const tipo = document.getElementById('tipo').value;
  const cantidad = parseFloat(document.getElementById('cantidad').value);
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;

  residuos.push({ tipo, cantidad, fecha, hora });
  guardar();
  formResiduo.reset();
  mostrarResiduos();
});

mostrarResiduos();
