import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useAuthContext } from '../context/AuthContext';

const MyNavbar = () => {
    const { usuario, logout } = useAuthContext();

    const desconectarUsuario = () => {
        logout();
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">D TRAVEL</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Inicio</Nav.Link>
                    {
                        usuario ? (
                            <>
                                <Nav.Link href="/crear">Compartir experiencia</Nav.Link>
                                <Nav.Link onClick={desconectarUsuario}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/login">Log in</Nav.Link>
                                <Nav.Link href="/register">Registrate</Nav.Link>
                            </>
                        )
                    }
                </Nav>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
