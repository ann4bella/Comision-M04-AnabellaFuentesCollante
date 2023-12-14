import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ImExit } from "react-icons/im";
import { AiOutlinePlusCircle } from "react-icons/ai";


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
            <Nav.Link href="/crear" title="Crear nuevo comentario"><AiOutlinePlusCircle /> Publicar</Nav.Link>
            <Nav.Link onClick={desconectarUsuario} title="Cerrar sesión"> Cerrar Sesion <ImExit /></Nav.Link>
        </>
    ) : (
        <>
            <Nav.Link href="/login" title="Iniciar sesión">Log in</Nav.Link>
            <Nav.Link href="/register" title="Registrarse">Registrate</Nav.Link>
        </>
    )
}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
