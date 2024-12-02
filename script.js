
const apiKey = '095560f85edf86115aadb352a24de6d1'; // Clave API proporcionada
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=Lima,PE&units=metric&lang=es&appid=${apiKey}`;
 
/**
 * Función para obtener datos del clima desde la API y actualizar la interfaz.
 */
function fetchWeatherData() {
  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los datos del clima');
      }
      return response.json();
    })
    .then(data => updateWeatherUI(data))
    .catch(error => {
      console.error(error);
      document.getElementById('weather-info').innerHTML =
        '<p>No se pudo obtener la información del clima.</p>';
    });
}
 
/**
 * Función para actualizar la interfaz de usuario con los datos del clima
 * @param {object} data - Objeto con los datos del clima obtenidos de la API.
 */
function updateWeatherUI(data) {
  const { name, main, weather } = data;
  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <p>Temperatura: ${main.temp}°C</p>
    <p>Humedad: ${main.humidity}%</p>
    <p>Clima: ${weather[0].description}</p>
  `;
}
 
// Llamada inicial al cargar la página
document.addEventListener('DOMContentLoaded', fetchWeatherData);
 