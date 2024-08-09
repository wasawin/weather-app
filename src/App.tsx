import { useEffect, useState } from 'react';
import { Weather } from './types/weatherTypes';
import axios from 'axios';
export default function App() {
  const [weather, setWeather] = useState<Weather[] | null>(null);
  const getWeather = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`;
    axios.get(url).then((response) => {
      console.log(response.data);

      setWeather(response.data);
    });
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-slate-300 justify-center items-center gap-4">
        <h1 className="text-3xl font-bold underline text-center">
          Hello world!
        </h1>
        <button
          className="p-2 bg-white border-2 border-black hover:bg-black hover:text-white"
          onClick={getWeather}
          type="button"
        >
          Get Weather
        </button>
        {weather ? <p>have data</p> : <p>no data</p>}
      </div>
    </>
  );
}
