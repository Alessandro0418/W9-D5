import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

function WeatherDetails() {
  const { cityName, date } = useParams();
  const city = cityName || "Roma";

  const [weatherDetails, setWeatherDetails] = useState(null);
  const [cityImage, setCityImage] = useState("");

  useEffect(() => {
    if (!cityName || !date) return;

    const API = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},it&units=metric&appid=d5d556221e3d4c6bb1a764a8e38666c7`;
    const API2 = `https://api.pexels.com/v1/search?query=${city}&per_page=1`;

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
      });

    fetch(API2, {
      headers: {
        Authorization:
          "8yKxtAVFzxdveGMUuHPwFugOYCHjZSXKrx97zCZ6DXtPsOcZ1xcM0k7k",
      },
    })
      .then((res) => res.json())
      .then((pexelsData) => {
        if (pexelsData.photos && pexelsData.photos.length > 0) {
          setCityImage(pexelsData.photos[0].src.large);
        }
      })
      .catch((error) => {
        console.error("Error fetching weather details:", error);
      });
  }, [cityName, date]);

  return (
    <Container
      className="text-white p-4 mt-4 rounded-3 position-relative"
      style={{
        backgroundImage: `url(${cityImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      {/* Overlay scuro globale */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      ></div>

      {/* Effetto sfumato a sinistra */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "40%",
          height: "100%",
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent)",
          zIndex: 2,
        }}
      ></div>
      <div style={{ position: "relative", zIndex: 3 }}>
        {weatherDetails ? (
          <div>
            <h1>
              {cityName} -{" "}
              {new Date(weatherDetails.dt_txt).toLocaleDateString()}
            </h1>
            <p>
              <i class="bi bi-cloud"></i>{" "}
              {weatherDetails.weather[0].description}
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
    </Container>
  );
}

export default WeatherDetails;
