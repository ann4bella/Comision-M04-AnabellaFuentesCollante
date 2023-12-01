import { useState, useEffect } from 'react';
// Importamos las funciones necesarias de React Bootstrap y Axios.
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// Importamos el hook `useNavigate` de React Router DOM y Axios para realizar peticiones HTTP.

import { traerDatosDePosteoPorID } from './../utils/llamados.js';
// Importamos una función utilitaria para traer datos específicos de una publicación por su ID.

const FormularioEditar = (props) => {
    // Declaramos las variables de estado necesarias para manejar el formulario.
    const { id, usuario, token } = props;
    // Extraemos las propiedades `id`, `usuario`, y `token` del objeto `props`.

    const url = 'http://localhost:3000/publicacion';
    // Definimos la URL del servidor donde se enviarán las solicitudes relacionadas con las publicaciones.

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    // Utilizamos el hook `useState` para manejar el estado de los campos `titulo` y `descripcion`.

    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
    const [errores, setErrores] = useState({});
    // Definimos estados para controlar la habilitación del botón y manejar posibles errores.

    const navigate = useNavigate();
    // Inicializamos la función `useNavigate` para navegar entre las páginas de la aplicación.

    const cambiarTitulo = (e) => {
        setTitulo(e.target.value);
    }
    // Definimos una función para actualizar el estado `titulo` cuando el usuario modifica el campo correspondiente.

    const cambiarDescripcion = (e) => {
        setDescripcion(e.target.value);
    }
    // Definimos una función para actualizar el estado `descripcion` cuando el usuario modifica el campo correspondiente.

    const verificarDatos = async () => {
        // Función asincrónica para verificar y enviar los datos del formulario al servidor.
        let misErrores = {}

        if (titulo.length === 0) {
            misErrores.titulo = 'Debe introducir al menos un titulo.';
        }
        // Verificamos si el campo `titulo` está vacío y, de ser así, agregamos un mensaje de error.

        if (descripcion.length === 0) {
            misErrores.descripcion = 'Debe introducir al menos una descripcion.';
        }
        // Verificamos si el campo `descripcion` está vacío y, de ser así, agregamos un mensaje de error.

        setErrores(misErrores);
        // Actualizamos el estado `errores` con los errores encontrados.

        if (Object.entries(misErrores).length === 0) {
            // Verificamos si no hay errores en el objeto `misErrores`.
            setDeshabilitarBoton(true);
            // Deshabilitamos el botón para evitar envíos duplicados.

            await mandarDatos();
            // Llamamos a la función `mandarDatos` para enviar la información al servidor.
        }
    }

    const mandarDatos = async () => {
        // Función asincrónica para enviar datos al servidor.
        const datos = {
            id: id,
            titulo: titulo,
            descripcion: descripcion,
        }
        // Creamos un objeto `datos` con la información a enviar al servidor.

        const headers = {
            token: token
        }
        // Creamos un objeto `headers` con el token de autenticación.

        try {
            const respuesta = await axios.put(url, datos, { headers: headers });
            // Enviando una solicitud PUT al servidor con los datos y encabezados proporcionados.

            if (respuesta.status === 200) {
                return navigate('/');
                // Si la respuesta del servidor es exitosa, redirigimos al usuario a la página principal.
            } else {
                setErrores({ error: 'Ocurrió un error inesperado' });
                // Si hay un error en la respuesta del servidor, actualizamos el estado `errores`.
            }
        } catch (error) {
            setErrores({ error: 'Ocurrió un error inesperado' });
            // Si ocurre un error durante la solicitud, actualizamos el estado `errores`.
        }

        setDeshabilitarBoton(false);
        // Habilitamos nuevamente el botón después de procesar la solicitud.
    }

    const traerDatos = async () => {
        // Función asincrónica para obtener datos específicos de la publicación por su ID.
        if (usuario) {
            // Verificamos si hay un usuario autenticado.
            const respuesta = await traerDatosDePosteoPorID(id);
            // Llamamos a la función utilitaria `traerDatosDePosteoPorID` para obtener información de la publicación.

            if (respuesta) {
                if (usuario.id !== respuesta.autor) {
                    return navigate('/');
                    // Si el usuario autenticado no coincide con el autor de la publicación, redirigimos al usuario.
                }

                setTitulo(respuesta.titulo);
                setDescripcion(respuesta.descripcion);
                // Si todo está bien, actualizamos los estados `titulo` y `descripcion` con los datos de la publicación.
            } else {
                setErrores({ error: 'Ocurrió un error inesperado. No se pudo obtener la publicación' });
                setDeshabilitarBoton(true);
                // Si hay un error al obtener los datos de la publicación, actualizamos el estado `errores` y deshabilitamos el botón.
            }
        } else {
            return navigate('/');
            // Si no hay un usuario autenticado, redirigimos al usuario.
        }
    }

    useEffect(() => {
        traerDatos();
        // Utilizamos el hook `useEffect` para llamar a la función `traerDatos` cuando el componente se monta.
    }, []);

    return (
        <Form>
            {/* Formulario de edición */}
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Título
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarTitulo} defaultValue={titulo} />
                    {
                        errores.titulo && (
                            <span style={{ color: 'red' }}>
                                {errores.titulo}
                            </span>
                        )
                    }
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                    Descripción
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarDescripcion} defaultValue={descripcion} />
                    {
                        errores.descripcion && (
                            <span style={{ color: 'red' }}>
                                {errores.descripcion}
                            </span>
                        )
                    }
                </Col>
            </Form.Group>

            {
                errores.error && (
                    <Alert variant="warning">
                        {errores.error}
                    </Alert>
                )
            }

            <Button variant="primary" onClick={verificarDatos} disabled={deshabilitarBoton}>
                Guardar edicion
            </Button>
        </Form>
    );
}

export default FormularioEditar;

