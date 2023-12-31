import { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { useAuthContext } from '../context/AuthContext';

const FormularioCrearPosteo = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenURL, setImagenURL] = useState('');
    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
    const [errores, setErrores] = useState({});

    const navigate = useNavigate();
    const { token } = useAuthContext();

    const cambiarTitulo = (e) => {
        setTitulo(e.target.value);
    }

    const cambiarDescripcion = (e) => {
        setDescripcion(e.target.value);
    }

    const cambiarImagenURL = (e) => {
        setImagenURL(e.target.value);
    }

    const verificarDatos = async () => {
        let misErrores = {}

        if (titulo.length === 0) {
            misErrores.titulo = 'Debe introducir un título.';
        }

        if (descripcion.length === 0) {
            misErrores.descripcion = 'Debe introducir una descripción.';
        }
        if (!imagenURL) {
            misErrores.imagenURL = 'Debe proporcionar una URL de imagen.';
        }

        setErrores(misErrores);

        if (Object.entries(misErrores).length === 0) {
            setDeshabilitarBoton(true);

            await mandarDatos();
        }
    }

    const mandarDatos = async () => {
        const url = 'http://localhost:3000/publicacion';

        const datos = {
            titulo: titulo,
            descripcion: descripcion,
            imagenURL: imagenURL,
        }

        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.post(url, datos, { headers: headers });

            if (respuesta.status === 200) {
                return navigate('/');
            } else {
                setErrores({ error: 'Ocurrió un error inesperado' });
            }
        } catch (error) {
            setErrores({ error: 'Ocurrió un error inesperado' });
        }

        setDeshabilitarBoton(false);
    }

    return (
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Título
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarTitulo} />
                    {
                        errores.titulo && (
                            <span style={{ color: 'red' }}>
                                {errores.titulo}
                            </span>
                        )
                    }
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Descripción
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarDescripcion} />
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
          <Form.Control type="text" onInput={cambiarImagenURL} />
          {errores.imagenURL && <span style={{ color: 'red' }}>{errores.imagenURL}</span>}
        </Col>
      </Form.Group>

      {imagenURL && (
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <img src={imagenURL} alt="Vista previa" style={{ maxWidth: '50%' }} />
          </Col>
        </Form.Group>
      )}

            {errores.error && (
                <Alert variant="warning">{errores.error}</Alert>
            )}

                <Button variant="primary" onClick={verificarDatos} disabled={deshabilitarBoton}>
                    Crear publicación
                </Button>
        </Form>
    );
}

export default FormularioCrearPosteo;
