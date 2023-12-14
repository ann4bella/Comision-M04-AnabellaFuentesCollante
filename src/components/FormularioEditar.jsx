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
    const { id, usuario, token } = props;

    const url = 'http://localhost:3000/publicacion';

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenURL, setImagenURL] = useState('');

    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
    const [errores, setErrores] = useState({});

    const navigate = useNavigate();

    const cambiarTitulo = (e) => {
        setTitulo(e.target.value);
    }

    const cambiarDescripcion = (e) => {
        setDescripcion(e.target.value);
    }

    const cambiarImagenURL = (e) => {
        setImagenURL(e.target.value);
    };

    // Definimos una función para actualizar el estado `descripcion` cuando el usuario modifica el campo correspondiente.

    const verificarDatos = async () => {
        let misErrores = {}

        if (titulo.length === 0) {
            misErrores.titulo = 'Debe introducir al menos un titulo.';
        }
        if (descripcion.length === 0) {
            misErrores.descripcion = 'Debe introducir al menos una descripcion.';
        }
        if (!imagenURL) {
            misErrores.imagenURL = 'Debes proporcionar una URL valida de imagen.';
        }

        setErrores(misErrores);

        if (Object.entries(misErrores).length === 0) {
           setDeshabilitarBoton(true);
            // Deshabilitamos el botón para evitar envíos duplicados.

            await mandarDatos();
            // Llamamos a la función `mandarDatos` para enviar la información al servidor.
        }
    }

    const mandarDatos = async () => {        
        const datos = {
            id: id,
            titulo: titulo,
            descripcion: descripcion,
            imagenURL: imagenURL,
        };
    
        const headers = {
            token: token,
        };
    
        try {
            const respuesta = await axios.put(url, datos, { headers: headers });
    
            if (respuesta.status === 200) {
                return navigate('/');
            } else {
                setErrores({ error: 'Ocurrió un error inesperado' });
            }
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
            setErrores({ error: 'Ocurrió un error inesperado' });
        }
    
        setDeshabilitarBoton(false);
    
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
                setImagenURL(respuesta.imagenURL);
                // Si todo está bien, actualizamos los estados `titulo` `descripcion` imagenURL con los datos de la publicación.
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
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Título
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarTitulo} value={titulo} />
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
                    <Form.Control type="text" onInput={cambiarDescripcion} value={descripcion} />
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

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    URL de la Imagen
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarImagenURL} value={imagenURL} />
                    {errores.imagenURL && <span style={{ color: 'red' }}>{errores.imagenURL}</span>}
                </Col>
            </Form.Group>

            {imagenURL && (
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <img src={imagenURL} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    </Col>
                </Form.Group>
            )}

            {errores.error && (
                <Alert variant="warning">{errores.error}</Alert>
            )}

            <Button variant="primary" onClick={verificarDatos} disabled={deshabilitarBoton}>
                Guardar edición
            </Button>
        </Form>
    );
}

export default FormularioEditar;