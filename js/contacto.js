// ============ CAPTCHA ============

// Callback de reCAPTCHA (definido en data-callback)
function mostrarFormulario() {
    // Solo marcamos un flag; también validaremos en el submit
    document.getElementById("contactForm").dataset.captchaOk = "true";
}

// ============ VALIDACIONES + MODAL ============

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const btnEnviar = document.getElementById("btnEnviar");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre   = document.getElementById("nombre");
            const correo   = document.getElementById("correo");
            const telefono = document.getElementById("telefono");
            const mensaje  = document.getElementById("mensaje");

            let esValido = true;

            // Validación 1: nombre
            if (nombre.value.trim().length < 3) {
                nombre.classList.add("is-invalid");
                esValido = false;
            } else {
                nombre.classList.remove("is-invalid");
            }

            // Validación 2: correo
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo.value.trim())) {
                correo.classList.add("is-invalid");
                esValido = false;
            } else {
                correo.classList.remove("is-invalid");
            }

            // Validación 3: teléfono (solo números, mínimo 8 dígitos)
            const telRegex = /^[0-9]{8,}$/;
            if (!telRegex.test(telefono.value.trim())) {
                telefono.classList.add("is-invalid");
                esValido = false;
            } else {
                telefono.classList.remove("is-invalid");
            }

            // Validación 4: mensaje (mínimo 10 caracteres)
            if (mensaje.value.trim().length < 10) {
                mensaje.classList.add("is-invalid");
                esValido = false;
            } else {
                mensaje.classList.remove("is-invalid");
            }

            // Validar reCAPTCHA
            const respuestaCaptcha = grecaptcha.getResponse();
            if (respuestaCaptcha.length === 0) {
                alert("Por favor, complete el captcha antes de enviar.");
                esValido = false;
            }

            if (!esValido) {
                return;
            }

            // Rellena datos del modal
            document.getElementById("modalNombre").textContent   = nombre.value.trim();
            document.getElementById("modalCorreo").textContent   = correo.value.trim();
            document.getElementById("modalTelefono").textContent = telefono.value.trim();
            document.getElementById("modalMensaje").textContent  = mensaje.value.trim();

            // Mostrar modal
            const modal = new bootstrap.Modal(document.getElementById("envioModal"));
            modal.show();

            // Opcional: limpiar formulario y resetear captcha
            form.reset();
            grecaptcha.reset();
        });
    }

    // ============ MAPA CON LEAFLET ============

    const mapDiv = document.getElementById("map");

    if (mapDiv && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const map = L.map("map").setView([lat, lon], 14);

                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    maxZoom: 19
                }).addTo(map);

                L.marker([lat, lon])
                    .addTo(map)
                    .bindPopup("Tu ubicación actual")
                    .openPopup();
            },
            () => {
                // Si el usuario no da permiso, centramos en Costa Rica
                const map = L.map("map").setView([9.936, -84.09], 7);

                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    maxZoom: 19
                }).addTo(map);
            }
        );
    }
});



 // prueba de localizacion

document.addEventListener('DOMContentLoaded', () => {
  const btnUbicacion   = document.getElementById('btnUbicacion');
  const latInput       = document.getElementById('latitud');
  const lngInput       = document.getElementById('longitud');
  const ubicacionTexto = document.getElementById('ubicacionTexto');

  if (btnUbicacion && latInput && lngInput) {
    btnUbicacion.addEventListener('click', () => {

      if (!navigator.geolocation) {
        ubicacionTexto.textContent = 'Tu navegador no soporta geolocalización.';
        return;
      }

      btnUbicacion.disabled = true;
      btnUbicacion.textContent = 'Obteniendo ubicación...';

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          // Guardar en los inputs (se enviarán con el formulario)
          latInput.value = latitude;
          lngInput.value = longitude;

          // Mostrar al usuario
          ubicacionTexto.textContent = `Ubicación obtenida: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

          btnUbicacion.textContent = 'Ubicación lista';
        },
        (err) => {
          console.error(err);
          ubicacionTexto.textContent = 'No se pudo obtener la ubicación (permiso denegado o error).';
          btnUbicacion.disabled = false;
          btnUbicacion.textContent = 'Obtener mi ubicación';
        }
      );
    });
  }
});
