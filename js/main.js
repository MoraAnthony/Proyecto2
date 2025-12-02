

// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  // 1) Cargar requisitos desde JSON (solo si existe el contenedor)
  const contenedor = document.getElementById('requisitosContainer');

  if (contenedor) {
    fetch('data/inicio.json')
      .then(res => res.json())
      .then(data => {
        data.forEach(item => {
          const col = document.createElement('div');
          col.className = 'col-12 col-md-6 col-lg-4';

          col.innerHTML = `
            <div class="card requisito-card h-100">
              <div class="card-body">
                <h5 class="card-title">${item.titulo}</h5>
                <p class="card-text">${item.descripcion}</p>
              </div>
            </div>
          `;
          contenedor.appendChild(col);
        });
      })
      .catch(err => console.error('Error cargando inicio.json', err));
  }

  // 2) Botón "Mostrar más detalles" -> carga enlaces desde JSON
  const btnVerMas = document.getElementById('btnVerMas');
  const enlacesDiv = document.getElementById('listaEnlaces');

  if (btnVerMas && enlacesDiv) {
    btnVerMas.addEventListener('click', () => {
      // Mostrar/ocultar contenedor de enlaces
      enlacesDiv.classList.toggle('d-none');

      const oculto = enlacesDiv.classList.contains('d-none');
      btnVerMas.textContent = oculto ? 'Mostrar más detalles' : 'Ocultar detalles';

      // Solo cargar el JSON la primera vez
      if (!enlacesDiv.hasChildNodes() && !oculto) {
        fetch('data/inicio.json')
          .then(res => res.json())
          .then(data => {
            data.forEach(item => {
              const link = document.createElement('a');
              link.href = item.url;
              link.target = '_blank';
              link.className = 'd-block mb-2 fw-semibold text-primary';
              link.innerText = item.nombre;

              enlacesDiv.appendChild(link);
            });
          })
          .catch(err => console.error('Error cargando enlaces.json', err));
      }

      // Cambiar estilo del botón (opcional)
      btnVerMas.classList.toggle('btn-outline-primary');
      btnVerMas.classList.toggle('btn-primary');
    });
  }

  // 3) Animación al hacer scroll (IntersectionObserver)
  const elementosAnimados = document.querySelectorAll('.animate-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    elementosAnimados.forEach(el => observer.observe(el));
  } else {
    // Fallback: mostrar todo si no hay soporte
    elementosAnimados.forEach(el => el.classList.add('visible'));
  }
});
