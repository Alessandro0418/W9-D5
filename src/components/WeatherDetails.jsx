import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function WeatherDetails() {
  const { cityName, date } = useParams();

  const [weatherDetails, setWeatherDetails] = useState(null);

  useEffect(() => {
    if (!cityName || !date) return;

    const API = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},it&units=metric&appid=d5d556221e3d4c6bb1a764a8e38666c7`;

    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero dei dati");
        }
      })
      .then((data) => {
        const dayForecast = data.list.find(
          (item) => item.dt_txt.split(" ")[0] === date
        );
        setWeatherDetails(dayForecast);
      })
      .catch((error) => {
        console.error("Error fetching weather details:", error);
      });
  }, [cityName, date]);

  return (
    <div className="text-white bg-dark p-4 rounded-4 mt-4 ms-4 me-4">
      {weatherDetails ? (
        <div>
          <h1>
            {cityName} - {new Date(weatherDetails.dt_txt).toLocaleDateString()}
          </h1>
          <p>
            <i class="bi bi-cloud"></i> {weatherDetails.weather[0].description}
          </p>
          <p>
            {" "}
            <i class="bi bi-thermometer-sun"> </i> Temp:{" "}
            {Math.round(weatherDetails.main.temp)}°C
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      ) : (
        <p>Caricamento dettagli...</p>
      )}
    </div>
  );
}

export default WeatherDetails;
