import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import CurrentWeather from "./components/CurrentWeather";
import NextDays from "./components/NextDays";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  return (
    <BrowserRouter>
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
          <Route path="/city/:cityName/:date" element={<WeatherDetails />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
