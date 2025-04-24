import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import CurrentWeather from "./components/CurrentWeather";
import NextDays from "./components/NextDays";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherDetails from "./components/WeatherDetails";
import IntroAnimation from "./components/IntroAnimation";
import { Container } from "react-bootstrap";
import { useState } from "react";

function App() {
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  return (
    <BrowserRouter>
      <Container fluid className="p-0">
        {isIntroVisible ? (
          <div className="intro-overlay">
            <IntroAnimation onFinish={() => setIsIntroVisible(false)} />
          </div>
        ) : (
          <>
            <MyNavbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <CurrentWeather />
                    <NextDays />
                  </>
                }
              />
              <Route
                path="/city/:cityName/:date"
                element={<WeatherDetails />}
              />
              <Route
                path="/city/:cityName"
                element={
                  <>
                    <CurrentWeather />
                    <NextDays />
                  </>
                }
              />
            </Routes>
          </>
        )}
      </Container>
    </BrowserRouter>
  );
}

export default App;
