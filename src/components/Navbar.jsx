import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { ImExit } from 'react-icons/im';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useAuthContext } from '../context/AuthContext';

const MyNavbar = () => {
  const { usuario, logout } = useAuthContext();

  const desconectarUsuario = () => {
    logout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">D TRAVEL</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            {usuario ? (
              <Nav>
                <Nav.Link href="/crear" title="Crear nuevo comentario">
                  <AiOutlinePlusCircle /> Publicar
                </Nav.Link>
                <NavDropdown title={usuario.nombre} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={desconectarUsuario}>
                    Cerrar Sesión <ImExit />
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link href="/login" title="Iniciar sesión">
                  Log in
                </Nav.Link>
                <Nav.Link href="/register" title="Registrarse">
                  Registrate
                </Nav.Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <p style={{textAlign: "right", color:'whitesmoke', padding:'20px'}}>{ usuario ? ('Hola ' + usuario.nombres + '!') : 'Pensas crear una publicación? Registrate' }</p>
    </Navbar>
  );
};

export default MyNavbar;
