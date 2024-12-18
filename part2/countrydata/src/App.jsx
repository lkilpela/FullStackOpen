import { useState, useEffect } from 'react'
import dataCountries from './services/dataCountries'  

const Search = ({ search, handleSearchChange }) => {
  return (
    <div>
      find countries <input 
                        value={search}
                        onChange={handleSearchChange} />
    </div>
  )
}

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    dataCountries
      .getWeather(country.capital)
      .then(weather => {
        setWeather(weather)
      })
      .catch(error => {
        console.error('Error fetching weather data:', error)
      })
  }, [country.capital])

  if (!weather) {
    return null
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
      {weather && (
        <div>
          <h2>Weather in {country.capital}</h2>
          <div>temperature: {weather.main.temp} Celcius</div>
          <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
          <div>wind: {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  )
}

const CountryList = ({ countries, search, handleShowCountry }) => {
  if (!Array.isArray(countries)) {
    return null
  }

  const filteredCountries = countries.filter(country => {
    return country.name.common.toLowerCase().includes(search.toLowerCase())
  })

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return (
      <CountryDetail country={country} />
    )
  }

  return (
    <div>
      {filteredCountries.map(country => 
        <div key={country.cca2}>
          {country.name.common}
          <button onClick={() => handleShowCountry(country)}>show</button>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    dataCountries
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  const countriesToShow = selectedCountry ? [selectedCountry] : countries

  return (
    <div>
      <Search search={search} handleSearchChange={handleSearchChange} />
      <CountryList countries={countriesToShow} search={search} handleShowCountry={handleShowCountry}/>
    </div>
  )
}

export default App