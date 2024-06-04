function displayCurrentWeather(data) {
    const cityName = data.name;
    const currentDate = new Date(data.dt * 1000); // Convert Unix timestamp to milliseconds
    const weatherIcon = data.weather[0].icon;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    const weatherContainer = document.getElementById('todaysWeather');
    weatherContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${cityName} - ${currentDate.toLocaleDateString()}</h5>
                <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
                <p class="card-text">Temperature: ${temperature}°C</p>
                <p class="card-text">Humidity: ${humidity}%</p>
                <p class="card-text">Wind Speed: ${windSpeed} m/s</p>
            </div>
        </div>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Clear previous forecast data

    const forecasts = data.list.filter((item, index) => index % 8 === 0); // Filter forecasts to include only every 8th entry

    forecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000); // Convert Unix timestamp to milliseconds
        const weatherIcon = forecast.weather[0].icon;
        const temperature = forecast.main.temp;
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('card', 'm-2');
        forecastCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${date.toLocaleDateString()}</h5>
                <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
                <p class="card-text">Temperature: ${temperature}°C</p>
                <p class="card-text">Humidity: ${humidity}%</p>
                <p class="card-text">Wind Speed: ${windSpeed} m/s</p>
            </div>
        `;
        forecastContainer.appendChild(forecastCard);
    });
}

function grabWeather() {
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayCurrentWeather(data);
            return data.coord; // Return coordinates for forecast API call
        })
        .then(coord => {
            const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`;
            return fetch(forecastApiUrl);
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayForecast(data);
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
        });
}

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log('Form submitted'); // Check if the event listener is triggered
    grabWeather();
});
