import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function MenuPrincipal() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Contagem</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#inventario">Inventarios</Nav.Link>
            <Nav.Link href="#cadastrodemanda">Cadastro demanda</Nav.Link>
            <Nav.Link href="#sair">Sair</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MenuPrincipal;
