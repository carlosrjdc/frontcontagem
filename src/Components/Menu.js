import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function MenuPrincipal() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="home">Contagem</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="listainventario">Inventarios</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MenuPrincipal;
