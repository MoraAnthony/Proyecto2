// js/acerca.js
document.addEventListener('DOMContentLoaded', () => {
  const contAutores = document.getElementById('autoresContainer');

  if (contAutores) {
    fetch('data/acerca.json')
      .then(res => res.json())
      .then(autores => {
        autores.forEach(autor => {
          const col = document.createElement('div');
          col.className = 'col-12 col-md-6 col-lg-4';

          col.innerHTML = `
            <div class="card h-100 text-center">
              <div class="card-body">
                <img src="${autor.foto}" alt="${autor.nombre}"
                     class="rounded-circle mb-3" width="120" height="120">
                <h5 class="card-title">${autor.nombre}</h5>
                <p class="card-text">${autor.descripcion}</p>
                <a href="mailto:${autor.correo}" class="btn btn-sm btn-primary btn-animado">
                  ${autor.correo}
                </a>
              </div>
            </div>
          `;
          contAutores.appendChild(col);
        });
      })
      .catch(err => console.error('Error cargando acerca.json', err));
  }

  // Interacción sencilla: mostrar/ocultar contexto extra
  const btnVerContexto = document.getElementById('btnVerContexto');
  const contextoExtra = document.getElementById('contextoExtra');

  if (btnVerContexto && contextoExtra) {
    btnVerContexto.addEventListener('click', () => {
      const oculto = contextoExtra.classList.contains('d-none');
      contextoExtra.classList.toggle('d-none');
      btnVerContexto.textContent = oculto
        ? 'Ocultar contexto'
        : 'Ver más sobre el contexto';
    });
  }
});




document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".flow-step").forEach((step, i) => {
        setTimeout(() => step.classList.add("active"), i * 300);
    });
});



const col = document.createElement('div');
col.className = 'col-12 col-md-6 col-lg-4 autor-col';

col.innerHTML = `
    <div class="autor-card">
        <img src="${autor.foto}" alt="${autor.nombre}">
        <h5>${autor.nombre}</h5>
        <p>${autor.descripcion}</p>
        <a href="mailto:${autor.correo}" class="btn btn-sm btn-primary btn-animado mt-2">
            ${autor.correo}
        </a>
    </div>
`;



 // para ver js y el parrafo 







