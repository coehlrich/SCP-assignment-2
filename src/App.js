import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  return (
    <Container className="App">
      <Navbar expand="lg" bg="light">
        <Container fluid>
          <LinkContainer to="/home">
            <Navbar.Brand>
              SCP Foundation
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Item>
                <LinkContainer to="/home" >
                  <Nav.Link>Home Page</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to="/other-page">
                  <Nav.Link>Other Page</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default App;
