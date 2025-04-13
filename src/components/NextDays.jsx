import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function NextDays() {
  const { cityName } = useParams();
  const city = cityName || "Roma";

  const [forecast, setForecast] = useState([]);
  const [cityDisplayName, setCityDisplayName] = useState("");
  const [weather, setWeather] = useState({
    main: "",
    description: "",
    temp: "",
    humidity: "",
    icon: "",
  });

  const iconMap = {
    "01d": "bi-sun",
    "01n": "bi-moon",
    "02d": "bi-cloud-sun",
    "02n": "bi-cloud-moon",
    "03d": "bi-cloud",
    "09d": "bi-cloud-rain",
    "10d": "bi-cloud-drizzle",
    "11d": "bi-cloud-lightning",
    "13d": "bi-snow",
    "50d": "bi-cloud-fog",
  };

  useEffect(() => {
    const API = `https://api.openweathermap.org/data/2.5/forecast?q=${city},it&units=metric&appid=d5d556221e3d4c6bb1a764a8e38666c7`;

    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("ERRORE NEL RECUPERO DEI DATI");
        }
      })
      .then((data) => {
        console.log("DATA NEXT DAYS", data);
        const dailyForecast = {};

        setCityDisplayName(data.city.name);

        data.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          const hour = item.dt_txt.split(" ")[1];

          if (hour === "12:00:00") {
            dailyForecast[date] = item;
          }
        });

        const finalForecast = Object.values(dailyForecast).slice(0, 4);
        setForecast(finalForecast);
      });
  }, [city]);

  const weatherIcon = iconMap[weather.icon] || "bi-cloud";

  return (
    <Container>
      <Row className="mt-5">
        {forecast.length > 0 ? (
          forecast.map((day, index) => (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4 d-flex justify-content-center"
            >
              <Link
                to={`/city/${city}/${day.dt_txt.split(" ")[0]}`}
                className="text-decoration-none"
              >
                <div
                  id={`card${index + 1}`}
                  className="text-white border border-1 rounded-3 text-center p-3 w-100 h-100 card-hover"
                >
                  <h5>
                    {new Date(day.dt_txt)
                      .toLocaleDateString("it-IT", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })
                      .replace(/^\w/, (c) => c.toUpperCase())}
                  </h5>
                  <p>
                    {day.weather[0].main} - {day.weather[0].description}
                  </p>
                  <p>Temp: {Math.round(day.main.temp)}°C</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt="icon"
                  />
                </div>
              </Link>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-white">Caricamento previsioni...</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default NextDays;
