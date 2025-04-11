import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function MyNavbar() {
  return (
    <Navbar expand="lg" className="navbar-dark bg-black">
      <Container>
        <Navbar.Brand href="#home" className="fs-4">
          Weather App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <NavDropdown
              title="Locations"
              id="basic-nav-dropdown"
              className="custom-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Città 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Città 2</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Città 3</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Città 4</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
