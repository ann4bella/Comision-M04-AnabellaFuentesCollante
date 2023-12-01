import { createBrowserRouter } from "react-router-dom";

// Vistas
import Inicio from './src/views/Inicio.jsx';
import RegistrarUsuario from './src/views/RegistrarUsuario.jsx';
import Eliminar from './src/views/Eliminar.jsx';
import Editar from './src/views/Editar.jsx';
import Ver from './src/views/Ver.jsx';
import Login from './src/views/Login.jsx';
import CrearPosteo from './src/views/CrearPosteo.jsx';

const rutas = createBrowserRouter([
    {
        path: "/",
        element: <Inicio />,
    }, {
        path: "/register",
        element: <RegistrarUsuario />,
    }, {
        path: "/crear",
        element: <CrearPosteo />,
    }, {
        path: "/eliminar/:id",
        element: <Eliminar />,
    }, {
        path: "/editar/:id",
        element: <Editar />,
    }, {
        path: "/ver/:id",
        element: <Ver />,
    }, {
        path: "/login",
        element: <Login />
    }
]);

export { rutas }
