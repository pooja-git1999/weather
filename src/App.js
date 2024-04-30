import React, { useState } from 'react';
import './App.css';
import './Media.css'
function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const api = {
    key: '74e2e75423e6984d2e8067d956c405b8',
    base: 'https://api.openweathermap.org/data/2.5/'
  }
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
        console.log(data);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data. Please try again later.');
    }
  };

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeatherData();
    }
  };
  const convertToKmh = (metersPerSecond) => {
    return (metersPerSecond * 3.6).toFixed(2); // Convert m/s to km/h and round to 2 decimal places
  };

  return (
    <div className="App">

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error-message">**{error}**</p>}

      <div className="card">
        <div className='box-1'>
          <img src={require('./cloud-removebg-preview.png')} alt="" className='cloud' />
        </div>
        <div className="box-2">
          {weatherData && (
            <div className="weather-info">
              {/* city */}
              <div className='city'>
                <i class="fa-solid fa-street-view"></i>
                {weatherData.name}, {weatherData.sys.country}
              </div>
              {/* temp*/}
              <span className='temp'> {weatherData.main.temp}°C</span>

              <div className='weather-type'>
                <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt='weather-icon' className='weather-icon' />
                <div> {weatherData.weather[0].main} </div>
              </div>

              <div className='weather-details'>
                <div className='element'>
                  <i class="fa-solid fa-water size icon" ></i>
                  <div className='data'>
                    <div className='size'>{weatherData.main.humidity} %</div>
                    <div>Humidity</div>
                  </div>
                </div>
                <div className='element'>
                  <i class="fa-solid fa-wind size icon"></i>
                  <div className='data'>
                    <div className='size'> {convertToKmh(weatherData.wind.speed)} km/h</div>
                    <div>Wind Speed</div>
                  </div>
                </div>
              </div>

            </div>
          )}</div>
      </div>
    </div>
  );
}

export default App;
