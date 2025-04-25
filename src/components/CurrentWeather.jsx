import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function CurrentWeather() {
  const { cityName } = useParams();
  const city = cityName || "Roma";

  const [cityImage, setCityImage] = useState("");

  const API = `https://api.openweathermap.org/data/2.5/weather?q=${city},it&units=metric&appid=d5d556221e3d4c6bb1a764a8e38666c7`;
  const API2 = `https://api.pexels.com/v1/search?query=${city}&per_page=1`;

  const [weather, setWeather] = useState({
    main: "",
    description: "",
    temp: "",
    humidity: "",
    icon: "",
  });

  const iconMap = {
    "01d": "bi-sun", // Sole
    "01n": "bi-moon", // Luna
    "02d": "bi-cloud-sun", // Nuvole sparse (giorno)
    "02n": "bi-cloud-moon", // Nuvole sparse (notte)
    "03d": "bi-cloud", // Nuvole
    "09d": "bi-cloud-rain", // Pioggia
    "10d": "bi-cloud-drizzle", // Pioggia leggera
    "11d": "bi-cloud-lightning", // Tempesta
    "13d": "bi-snow", // Neve
    "50d": "bi-cloud-fog", // Nebbia
  };

  useEffect(() => {
    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("ERRORE NEL RECUPERO DEI DATI");
        }
      })
      .then((data) => {
        setWeather({
          main: data.weather[0].main,
          description: data.weather[0].description,
          temp: data.main.temp,
          humidity: data.main.humidity,
        });
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
      .catch((err) => {
        console.log("ERRORE DURANTE IL FETCH DEI DATI:", err);
      });
  }, [city]);

  const weatherIcon = iconMap[weather.icon] || "bi-cloud";

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
        <Row>
          <Col>
            <h2 className="mb-4">
              <i className="bi bi-geo-alt-fill fs-3"></i> {city}
            </h2>
            <h5 className="m-2">Info</h5>
            <p className="m-2">
              <strong>
                <i className={weatherIcon}> </i>
              </strong>
              {weather.main}
            </p>
            <p className="m-2">
              <strong>
                <i className={weatherIcon}> </i>
              </strong>
              {weather.description}
            </p>
            <p className="m-2">
              <strong>
                <i className="bi bi-thermometer-sun"> </i>
              </strong>{" "}
              {weather.temp}°C
            </p>
            <p className="m-2">
              <i className="bi bi-droplet"> </i>
              {weather.humidity}%
            </p>
          </Col>

          <Col className="custom-font-size ms-5">
            <p>
              <i className={weatherIcon}></i>
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default CurrentWeather;
