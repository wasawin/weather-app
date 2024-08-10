import { useEffect, useState } from 'react';
import WeatherTypes from './types/WeatherTypes';
import axios from 'axios';
export default function App() {
  const [weather, setWeather] = useState<WeatherTypes | null>(null);
  const [city, setCity] = useState<string>('London');
  const getWeather = (city: string = 'London') => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
      axios.get(url).then((response) => {
        console.log(response.data);
        setWeather(response.data);
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Error ${error.message}`);
      } else {
        console.log(`Error ${error}`);
      }
    }
  };

  // useEffect(() => {
  //   getWeather();
  // }, []);

  return (
    <>
      <main className="flex w-full min-h-screen bg-[url('https://images.pexels.com/photos/531767/pexels-photo-531767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover  justify-center items-center ">
        <section className="flex flex-col gap-4 bg-white/30  px-3 md:px-16 py-10 shadow-xl backdrop-blur-md max-sm:min-h-screen  w-full md:max-w-xl lg:max-w-3xl md:rounded-xl">
          <div className="relative">
            <label htmlFor="" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="Search"
              className="w-full rounded-md border-green-400 p-2.5 shadow-sm sm:text-sm"
              placeholder="Search city..."
              onChange={(e) => setCity(e.target.value)}
            />
            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button className="" onClick={() => getWeather(city)}>
                🔍
              </button>
            </span>
          </div>
          <section className="text-center">
            <h1>{weather?.name}</h1>
            {/* group center */}

            <div className="flex flex-col justify-center items-center gap-4 py-5">
              <div>
                <img
                  src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                  alt="weather"
                />
              </div>

              <div className="text-6xl md:text-7xl lg:text-8xl flex w-full h-28 items-center justify-center ">
                {weather?.main.temp.toFixed(1)}°
              </div>
              <p>{weather?.weather[0].description}</p>
            </div>

            {/* group end */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start px-5">
              <div>Visibility {weather?.visibility / 1000} Km</div>
              <div>Feel like {weather?.main.feels_like}°</div>
              <div>Humidity {weather?.main.humidity} %</div>
              <div>Wind {weather?.wind.speed} m/s</div>
            </div>
          </section>

          <button
            className="p-2 bg-white border-2 border-black hover:bg-black hover:text-white"
            onClick={() => getWeather()}
            type="button"
          >
            test Get Weather
          </button>
        </section>
      </main>
    </>
  );
}
