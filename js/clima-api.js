// Declaración de Variables del DOM
const $result = $d.getElementById("result");
const $form = $d.getElementById("weather-form");
const $button = $d.getElementById("consultar");

function showError(message) {
  console.log(message);
  const alert = document.createElement("p");
  alert.classList.add("alert-message");
  alert.innerHTML = message;

  $form.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 3000);
}

// Llamada a API de OpenWeather ~ Obtiene JSON
function callAPI(state, city, cityName) {
  const apiKey = "c2588886c66a76e9ca69ae944875a32a";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${state}&appid=${apiKey}`;

  // Realizar Consulta
  fetch(apiUrl)
    .then((data) => {
      return data.json();
    })
    .then((dataJSON) => {
      if (dataJSON.cod === "404") {
        showError("Ciudad no encontrada...");
      } else {
        clearHTML();
        showWeather(dataJSON, cityName, state);
        console.log(dataJSON);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// Evento ~ Presionar Botón
$button.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    $selectProvincias.value === "Seleccione una provincia" ||
    $selectLocalidades.value === "Seleccione una localidad"
  ) {
    showError("Ambos campos son obligatorios...");
    return;
  }

  callAPI(
    $selectProvincias.value,
    $selectLocalidades.value,
    $selectLocalidades.options[$selectLocalidades.selectedIndex].text
  );
});

// Desglosar JSON
function showWeather(data, nameCity, nameState) {
  const {
    name,
    main: { temp, temp_min, temp_max },
    weather: [arr],
  } = data;

  const degrees = kelvinToCentigrade(temp);
  const min = kelvinToCentigrade(temp_min);
  const max = kelvinToCentigrade(temp_max);

  // Creando Diseño HTML
  const content = document.createElement("div");
  content.innerHTML = `
        <h5>Clima en ${nameCity}, ${nameState}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C - Min: ${min}°C</p>`;

  $result.appendChild(content);
}

// Convertir Kelvin a Celsius
function kelvinToCentigrade(temp) {
  return parseInt(temp - 273.15);
}

function clearHTML() {
  $result.innerHTML = "";
}
