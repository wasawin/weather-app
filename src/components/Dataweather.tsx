import React from 'react';
import WeatherTypes from '../types/WeatherTypes';

interface DataWeatherProps {
  weather: WeatherTypes;
}
const DataWeather: React.FC<DataWeatherProps> = ({ weather }) => {
  return (
    <section className="text-center h-[600px] md:h-[500px] w-full flex flex-col justify-start md:justify-start gap-3 items-stretch">
      <h1 className="text-4xl font-semibold">{weather?.name}</h1>
      <p>{new Date().toDateString()}</p>

      <div className="flex flex-col justify-start text-center text-sm">
        <div className="mx-auto">
          <img
            src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
            alt="weather"
            className="aspect-square w-40 md:w-54"
          />
        </div>

        <div className="text-5xl md:text-6xl lg:text-7xl w-full">
          {weather?.main.temp.toFixed(1)}°
        </div>
        <p className="text-2xl drop-shadow-2xl mt-5 first-letter:uppercase">
          {weather?.weather[0].description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center p-5 text-sm my-auto">
        <div className="flex justify-evenly">
          <span>Visibility</span>
          <span>{(weather?.visibility ?? 'N/A') / 1000} Km</span>
        </div>

        <div className="flex justify-evenly">
          <span>Feel like</span>
          <span>{weather?.main.feels_like ?? 'N/A'}°</span>
        </div>

        <div className="flex justify-evenly">
          <span>Humidity</span>
          <span>{weather?.main.humidity ?? 'N/A'} %</span>
        </div>
        <div className="flex justify-evenly">
          <span>Wind</span>
          <span>{weather?.wind.speed ?? 'N/A'} m/s</span>
        </div>
      </div>
    </section>
  );
};

export default DataWeather;
