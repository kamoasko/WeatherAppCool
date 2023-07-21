import axios from "axios";
import { useEffect, useState } from "react";
import images from "../images/images";
import Spinner from "./Spinner";

const WeatherInfo = () => {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("Baku");
  const [click, setClick] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getWeatherInfo = async (url) => {
    const res = await axios.get(url);
    setWeather(res.data);
  };

  useEffect(() => {
    setLoading(true);
    setWeather({});
    getWeatherInfo(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8d348a62ee12b2bb05648ea0a4a52078`
    )
      .then(() => setError(false))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [click]);

  const { Clouds, Clear, Rain, Snow, Smoke, Mist, Fog } = images;
  let background = weather.weather && weather.weather[0]?.main;
  const bg =
    background === "Clouds"
      ? Clouds
      : background === "Clear"
      ? Clear
      : background === "Rain"
      ? Rain
      : background === "Snow"
      ? Snow
      : background === "Smoke"
      ? Smoke
      : background === "Mist"
      ? Mist
      : Fog;

  return loading ? (
    <div className="loading">
      <div>
        <Spinner type={"spin"} color={"green"} />
      </div>
    </div>
  ) : error ? (
    <section
      className="weather"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="weather__search">
        <input
          onInput={(e) => setCity(e.target.value)}
          type="search"
          placeholder="City"
          className="search"
        />
        <button onClick={() => setClick((prev) => !prev)} className="button">
          Search
        </button>
      </div>
      <div className="error">City is not found!!!</div>
    </section>
  ) : (
    <section
      className="weather"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="weather__search">
        <input
          onInput={(e) => setCity(e.target.value)}
          type="search"
          placeholder="City"
          className="search"
        />
        <button onClick={() => setClick((prev) => !prev)} className="button">
          Search
        </button>
      </div>
      <div className="weather__details">
        <h3 className="weather__city">
          {weather.name}, {weather.sys?.country} <br />
          <span>
            {Math.round(weather.main?.temp - 273.15)}&deg;{", "}
            {weather.weather && weather.weather[0]?.main}
          </span>
        </h3>
        <div className="weather__info">
          <span>
            RealFeel: {Math.round(weather.main?.feels_like - 273.15)}&deg;
          </span>
          <span>
            Maximum temperature: {Math.round(weather.main?.temp_max - 273.15)}
            &deg;
          </span>
          <span>
            Minimum temperature: {Math.round(weather.main?.temp_min - 273.15)}
            &deg;
          </span>
        </div>
      </div>
    </section>
  );
};

export default WeatherInfo;
