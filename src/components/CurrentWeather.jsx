import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const API =
  "https://api.openweathermap.org/data/2.5/weather?q=Roma&appid=d5d556221e3d4c6bb1a764a8e38666c7";

function CurrentWeather() {
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
        console.log("DATA", data);
        setWeather({
          main: data.weather[0].main,
          description: data.weather[0].description,
          temp: data.main.temp,
          humidity: data.main.humidity,
        });
      })
      .catch((err) => {
        console.log("ERRORE DURANTE IL FETCH DEI DATI:", err);
      });
  }, []);

  //   DEFAULT ICON
  const weatherIcon = iconMap[weather.icon] || "bi-cloud";

  return (
    <Container className="text-white bg-dark p-4 rounded-4 mt-4">
      <Row>
        <Col>
          <h2 className="mb-4">Roma</h2>
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
              <i class="bi bi-thermometer-sun"> </i>
            </strong>{" "}
            {weather.temp}°C
          </p>
          <p className="m-2">
            <strong></strong>
            {weather.humidity}%
          </p>
        </Col>

        {/* ICONA DINAMICA, CAMBIA A SECONDA DEL WEATHER CORRENTE */}
        <Col className="custom-font-size ms-5">
          <p>
            <i className={weatherIcon}></i>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default CurrentWeather;
