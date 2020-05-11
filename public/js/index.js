const weatherForm = document.querySelector('form');
const searchKey = document.querySelector('input');
const errorMessage = document.getElementById('error');
const weatherForecast = document.getElementById('forecast');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMessage.textContent = "Loading...";
    weatherForecast.textContent = "";

    fetch(`http://localhost:3000/weather?location=${searchKey.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error;
            }
            else {
                errorMessage.textContent = "";
                weatherForecast.textContent = `${data.weather_descriptions}. It is currently ${data.temperature}°C degrees. And It feels like ${data.feelslike}°C degrees out.`;
            }
        })
    })
})