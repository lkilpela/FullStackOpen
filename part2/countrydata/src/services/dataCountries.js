import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = import.meta.env.VITE_SOME_KEY

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const getWeather = (capital) => {
  return axios.get(`${weatherBaseUrl}?q=${capital}&appid=${apiKey}&units=metric`).then(response => response.data)
}


export default { getAll, getWeather }