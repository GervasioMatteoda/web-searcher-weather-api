// Declaración de Variables del DOM
const $d = document;
const $selectProvincias = $d.getElementById("select_provincias");
const $selectLocalidades = $d.getElementById("select_localidades");

// Obtener las Provincias de Argentina
function obtenerProvincias() {
  // Realizar Consulta
  fetch(`https://apis.datos.gob.ar/georef/api/provincias`)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      const provinciasOrdenadas = json.provincias.map((el) => el.nombre).sort();

      // Crear Opciones e Iterar para HTML
      let $options = `<option value="Seleccione una provincia">Seleccione una provincia</option>`;
      provinciasOrdenadas.forEach(
        (nombre) => ($options += `<option value="${nombre}">${nombre}</option>`)
      );

      $selectProvincias.innerHTML = $options;
    })
    .catch((error) => {
      let message = error.statusText || "Ocurrió un error";

      $selectProvincias.nextElementSibling.innerHTML = `Error: ${error.status}: ${message}`;
    });
}

// Evento ~ Cargar Página
$d.addEventListener("DOMContentLoaded", obtenerProvincias);

// Obtener las Localidades para Provincia
function obtenerLocalidades(provincia) {
  // Realizar Consulta
  fetch(
    `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&max=1000` /* Forzar Máx */
  )
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      const localidadesOrdenadas = json.localidades
        .map((el) => el.nombre)
        .sort();

      let $options = `<option value="Seleccione una localidad">Seleccione una localidad</option>`;
      localidadesOrdenadas.forEach(
        (nombre) => ($options += `<option value="${nombre}">${nombre}</option>`)
      );

      $selectLocalidades.innerHTML = $options;
    })
    .catch((error) => {
      let message = error.statusText || "Ocurrió un error";

      $selectLocalidades.nextElementSibling.innerHTML = `Error: ${error.status}: ${message}`;
    });
}

// Evento ~ Ingresar Provincia
$selectProvincias.addEventListener("change", (e) => {
  obtenerLocalidades(e.target.value);
});
