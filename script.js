// import api key from key.js
import apiKey from './key.js';

// get elements
const searchText = document.querySelector('#searchText')
const searchButton = document.querySelector('#searchButton')

const address = document.querySelector('#address')
const icon = document.querySelector('#icon')
const temperature = document.querySelector('#temperature')
const feelsLikeTemperature = document.querySelector('#feelsLikeTemperature')
const weather = document.querySelector('#weather')
const chanceOfRain = document.querySelector('#chanceOfRain')
const humidity = document.querySelector('#humidity')
const windSpeed = document.querySelector('#windSpeed')
const sunRise = document.querySelector('#sunRise')
const sunSet = document.querySelector('#sunSet')
const uv = document.querySelector('#uv')


// current date
const today = new Date()

// fetch api
const fetchData = (location) => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`)
        .then(res => {
            if (res.status == 400) {
                return alert('Invalid Location')
            }
            else if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            return res.json() // Parse the response as JSON
        })
        .then(data => {
            // Handle the data from the response here
            console.log(data)

            // Assign data in html
            address.innerText = `${data.location.name}, ${data.location.country}`
            temperature.innerText = data.current.temp_c
            feelsLikeTemperature.innerText = data.current.feelslike_c
            weather.innerText = data.current.condition.text
            chanceOfRain.innerText = data.current.precip_mm
            humidity.innerText = data.current.humidity
            windSpeed.innerText = data.current.wind_kph
            uv.innerText = data.current.uv
        })
        .catch(error => {
            // Handle errors or exceptions here
            console.error('There was a problem with the fetch operation:', error)
        })

    fetch(`https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${location}&dt=${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`)
        .then(res => {
            if (res.status == 400) {
                return alert('Invalid Location')
            }
            else if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            return res.json() // Parse the response as JSON
        })
        .then(data => {
            // Handle the data from the response here
            console.log(data)

            // Assign data in html
            sunRise.innerText = data.astronomy.astro.sunrise
            sunSet.innerText = data.astronomy.astro.sunset
        })
        .catch(error => {
            // Handle errors or exceptions here
            console.error('There was a problem with the fetch operation:', error)
        })
}

// button event listener
searchButton.addEventListener('click', () => {
    if (searchText.value === '') {
        alert("Location can't be empty")
    }
    else {
        fetchData(searchText.value)
    }
})

// add button trigger with enter key
searchText.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        searchButton.click()
    }
})

// initially fetch for ktm
fetchData('Kathmandu')


