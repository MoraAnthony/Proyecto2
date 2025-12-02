// js/propuesta.js
document.addEventListener('DOMContentLoaded', () => {
  const checks = document.querySelectorAll('.requisito-check');
  const barraProgreso = document.getElementById('barraProgreso');
  const porcentajeTexto = document.getElementById('porcentajeTexto');
  const estadoMensaje = document.getElementById('estadoMensaje');
  const resultadoCard = document.querySelector('.resultado-card');
  const recomendacionLista = document.getElementById('recomendacionLista');
  const btnReiniciar = document.getElementById('btnReiniciar');

  function calcularProgreso() {
    const total = checks.length;
    let marcados = 0;

    checks.forEach(chk => {
      if (chk.checked) marcados++;
    });

    const porcentaje = Math.round((marcados / total) * 100);
    actualizarUI(porcentaje, marcados, total);
  }

  function actualizarUI(porcentaje, marcados, total) {
    // Barra y texto
    porcentajeTexto.textContent = `${porcentaje}%`;
    barraProgreso.style.width = `${porcentaje}%`;

    // Limpiar clases de estado
    resultadoCard.classList.remove('estado-bajo', 'estado-medio', 'estado-alto');

    let tituloEstado = '';
    let mensajeEstado = '';
    let recomendaciones = '';

    if (porcentaje === 0) {
      barraProgreso.className = 'progress-bar bg-danger';
      resultadoCard.classList.add('estado-bajo');
      tituloEstado = 'Estado inicial';
      mensajeEstado = 'Aún no se han marcado requisitos. Inicie seleccionando los pasos que ya ha completado.';
      recomendaciones = `
        <ul>
          <li>Revise primero los requisitos sanitarios básicos.</li>
          <li>Busque información sobre permisos y carnés en el Ministerio de Salud.</li>
        </ul>
      `;
    } else if (porcentaje > 0 && porcentaje < 50) {
      barraProgreso.className = 'progress-bar bg-danger';
      resultadoCard.classList.add('estado-bajo');
      tituloEstado = 'Avance bajo';
      mensajeEstado = `Ha completado ${marcados} de ${total} requisitos clave. Es un buen momento para planificar los siguientes pasos.`;
      recomendaciones = `
        <ul>
          <li>Priorice obtener el permiso sanitario y el carné de manipulación.</li>
          <li>Formalice su negocio ante Tributación y CCSS.</li>
        </ul>
      `;
    } else if (porcentaje >= 50 && porcentaje < 80) {
      barraProgreso.className = 'progress-bar bg-warning';
      resultadoCard.classList.add('estado-medio');
      tituloEstado = 'Avance intermedio';
      mensajeEstado = `Ha completado ${marcados} de ${total} requisitos. Está en buen camino para participar en concursos de alimentos.`;
      recomendaciones = `
        <ul>
          <li>Revise si ya cuenta con firma digital o si debe gestionarla.</li>
          <li>Prepare la documentación necesaria para registrarse como proveedor en SICOP.</li>
          <li>Lea al menos un pliego de concurso para familiarizarse con los requisitos.</li>
        </ul>
      `;
    } else if (porcentaje >= 80 && porcentaje < 100) {
      barraProgreso.className = 'progress-bar bg-success';
      resultadoCard.classList.add('estado-alto');
      tituloEstado = 'Avance alto';
      mensajeEstado = `Ha completado ${marcados} de ${total} requisitos. Le falta muy poco para estar completamente preparado.`;
      recomendaciones = `
        <ul>
          <li>Verifique que su inscripción en SICOP esté activa y actualizada.</li>
          <li>Organice sus documentos (ofertas, listas de precios, fichas técnicas).</li>
        </ul>
      `;
    } else {
      barraProgreso.className = 'progress-bar bg-success';
      resultadoCard.classList.add('estado-alto');
      tituloEstado = 'Listo para participar';
      mensajeEstado = 'Ha marcado todos los requisitos. Su emprendimiento cuenta con las condiciones básicas para participar en procesos de compra de alimentos mediante SICOP.';
      recomendaciones = `
        <ul>
          <li>Monitoree regularmente los concursos de alimentos en SICOP.</li>
          <li>Evalúe la posibilidad de mejorar su capacidad de producción y logística.</li>
          <li>Mantenga al día todos los permisos y registros.</li>
        </ul>
      `;
    }

    estadoMensaje.innerHTML = `
      <h4 class="h6 mb-2">${tituloEstado}</h4>
      <p class="mb-0">${mensajeEstado}</p>
    `;

    recomendacionLista.innerHTML = `
      <h4 class="h6 mb-2">Recomendaciones</h4>
      ${recomendaciones}
    `;
  }

  // Escuchar cambios en todos los checkboxes
  checks.forEach(chk => {
    chk.addEventListener('change', calcularProgreso);
  });

  // Botón de reinicio
  if (btnReiniciar) {
    btnReiniciar.addEventListener('click', () => {
      checks.forEach(chk => chk.checked = false);
      calcularProgreso();
    });
  }

  // Estado inicial
  calcularProgreso();
});
