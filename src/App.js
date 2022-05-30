import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Route, Routes } from "react-router-dom";
import Item from "./Items";
import getItems from "./getItems";
import { useEffect, useState } from "react";
import Home from "./Home";

function App() {
  const [itemsState, setState] = useState([]);
  useEffect(() => getItems(setState), []);

  var items = [];
  if (itemsState) {
    items = setItems(itemsState.map(item => addZeroes(item.item)), 0);
  }
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
              <NavDropdown title="SCP Items" id="scp-items-root">
                <MapItems items={items} name=""/>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/items/:id" element={<Item />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Container>
  );
}

function setItems(items, position) {
  if (items.length === 1) {
    return items[0];
  }    
  const array = [];
  const indexes = new Set(items.map(item => parseInt(item.charAt(position))));
  indexes.forEach(index => {
    var filtered = items.filter(item => parseInt(item.charAt(position)) === index);
    array[index] = setItems(filtered, position + 1);
  });
  return array;
}

function MapItems(parameters) {
  const items = parameters.items;
  if (items.length === 0) {
    return (
      <NavDropdown.Item disabled>
        Loading...
      </NavDropdown.Item>
    )
  }
  const outerName = parameters.name;
  if (typeof items == "string") {
    return(
      <LinkContainer to={"items/" + items}>
        <NavDropdown.Item>SCP-{items}</NavDropdown.Item>
      </LinkContainer>
    );
  }
  return(
    <div>
      {
        items && items.map((item) => {
          const name = outerName + items.indexOf(item);
          return(
            <NavDropdown title={"SCP-" + addXs(name)} key={"scp-items-" + name} id={"scp-items-" + name} drop="end">
              <MapItems items={item} name={name} />
            </NavDropdown>
          )
        })
      }
    </div>
  );
}

function addZeroes(item) {
  while (item.length < 4) {
    item = "0" + item;
  }
  return item;
}

function addXs(name) {
  while (name.length < 4) {
    name = name + "x";
  }
  return name;
}

export default App;
