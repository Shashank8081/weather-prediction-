const searchButton = document.getElementById('searchBtn');
const locationInput = document.getElementById('location-input');
const weatherBody = document.getElementById('weather-body');
const locationNotFound = document.getElementById('location-not-found');

// OpenWeather API Key
const apiKey = '79f3f3a78b6867eb68f7b4a895928818';

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeatherData(location);
    } else {
        alert("Please enter a location.");
    }
});

// Fetch weather data from OpenWeather API
async function fetchWeatherData(location) {
    // Show loading feedback
    weatherBody.style.display = 'none';
    locationNotFound.style.display = 'none';
    document.body.style.cursor = 'wait'; // Optional: show busy cursor during loading

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 404) {
            displayLocationNotFound();
        } else {
            displayWeatherData(data);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayLocationNotFound();
    } finally {
        document.body.style.cursor = 'auto'; // Reset cursor after fetch
    }
}

// Display weather data on the page
function displayWeatherData(data) {
    locationNotFound.style.display = 'none';
    weatherBody.style.display = 'block';

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    document.getElementById('temperature').innerHTML = `${temperature}<sup>°C</sup>`;
    document.getElementById('description').innerText = description.charAt(0).toUpperCase() + description.slice(1);
    document.getElementById('humidity').innerText = `${humidity}%`;
    document.getElementById('wind-speed').innerText = `${windSpeed} Km/h`;
}

// Display "Location Not Found" message
function displayLocationNotFound() {
    locationNotFound.style.display = 'block';
    weatherBody.style.display = 'none';
}
