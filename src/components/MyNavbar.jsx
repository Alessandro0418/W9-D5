import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function MyNavbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/city/${search}`);
      setSearch("");
    }
  };

  return (
    <Navbar expand="lg" className="navbar-dark bg-black">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fs-4">
          Weather App
          {/* <img
            src="/public/img/WeatherAppLogo2.png"
            className=""
            alt="WeatherApp-Logo"
          /> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <NavDropdown title="Locations" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/city/Roma">
                Roma
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/city/Milano">
                Milano
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/city/Berlino">
                Berlino
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/city/New York">
                New York
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control me-2 bg-dark"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              Cerca
            </button>
          </form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
