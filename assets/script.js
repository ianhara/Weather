const apiKey = '917f9c9859212ef07d7a25b9d55a0ea1';

function grabWeather() {
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            const temp = data.
            const wind = data. 
            const humidity = data. 

            document.getElementById('todaysWeather').innerHTML = "Temperature : " + temp + "wind: " + wind + "humidity: " + humidity 
            
            fiveDayForecast(lat, lon);
        })
        .catch(function(error) {
            console.log("Error fetching weather:", error);
        });
}

function fiveDayForecast(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            
            document.getElementById('fiveDayForecast').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch(function(error) {
            console.log("Error fetching forecast:", error);
        });
}