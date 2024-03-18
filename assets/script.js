function grabWeather(){
const apiKey = '917f9c9859212ef07d7a25b9d55a0ea1'
                
const city = document.getElementById('city')
const state = document.getElementById('state')


const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

fetch(apiUrl)
//  {
//   method: 'GET', //GET is the default.
//   credentials: 'same-origin', // include, *same-origin, omit
//   redirect: 'follow', // manual, *follow, error
// }
  .then(function (response) {
    console.log(response)
    return response.json();
    
  })
  .then(function (data) {
    const lat = data.coord.lat
    const lon = data.coord.lon
    console.log(data.data.memes[0].name)
  });

}

grabWeather()
