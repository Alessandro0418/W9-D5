import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

const WeatherDetails = () => {
  const { cityName, date } = useParams();
  const [cityData, setCityData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cityName) return;

    const API = `https://api.openweathermap.org/data/2.5/weather?q=Roma&appid=d5d556221e3d4c6bb1a764a8e38666c7`;

    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella fetch dei dati meteo");
        }
      })
      .then((data) => {
        if (data.cod === 200) {
          setCityData(data);
        } else {
          throw new Error("Città non trovata");
        }
      })
      .catch((err) => {
        console.error("Errore:", err);
        setError(err.message);
      });
  }, [cityName]);

  if (error) {
    return (
      <div className="text-center text-white bg-dark p-5">
        <h3>{error}</h3>
        <p>Controlla il nome della città o riprova più tardi.</p>
      </div>
    );
  }

  if (!cityData && cityName) {
    return (
      <div className="text-center bg-dark p-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="text-white bg-dark p-4 rounded-4 mt-4">
      <Row>
        <Col>
          <div className="text-white bg-dark p-4">
            <h2>
              {cityData.name} - {cityData.sys.country}
            </h2>
            <h3>{cityData.weather[0].main}</h3>
            <p>{cityData.weather[0].description}</p>
            <p>Temperature: {Math.round(cityData.main.temp - 273.15)}°C</p>
            <p>Humidity: {cityData.main.humidity}%</p>
            <p>Wind: {cityData.wind.speed} m/s</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherDetails;
