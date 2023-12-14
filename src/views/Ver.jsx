import { useState, useEffect } from 'react';
import { Card, Button, FloatingLabel, Form } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import Timestamp from 'react-timestamp';

import { traerDatosDePosteoPorID, traerComentariosDePosteoPorID } from './../utils/llamados.js';

const Ver = () => {
    
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenURL, setImagenURL] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [comentarios, setComentarios] = useState([]);
    const [miComentario, setMiComentario] = useState('');
    const { usuario, token } = useAuthContext();

    const traerDatos = async () => {
        const respuesta = await traerDatosDePosteoPorID(id);

        if (respuesta) {
            setTitulo(respuesta.titulo);
            setImagenURL(respuesta.imagenURL);
            setDescripcion(respuesta.descripcion);
            setFechaCreacion(respuesta.fechaCreacion);
            await traerComentarios();
        } else {
            console.log('No se encontró una publicación con el id ' + id);
        }
    }

    const traerComentarios = async () => {
        const respuesta = await traerComentariosDePosteoPorID(id);

        if (respuesta) {
            setComentarios(respuesta);
            return respuesta.data; 
        } else {
            console.log('No pudimos obtener los comentarios de la publicación');
        }
    }


    const enviarComentario = async () => {
        const url = 'http://localhost:3000/comentarios';
        const datos = {
            descripcion: miComentario,
            idPosteo: id,
        }
        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.post(url, datos, { headers: headers });

            if (respuesta.status === 200) {
                console.log('Comentario enviado con éxito:', respuesta.data);
                setMiComentario('');
                await traerComentarios();
            } else {
                console.log({ error: 'Ocurrió un error inesperado' });
            }
        } catch (error) {
            console.log({ error: 'Ocurrió un error inesperado' });
        }
    }

    useEffect(() => {
        traerDatos();
    }, []);


    const navigate = useNavigate();

    const eliminarComentario = async (comentarioId) => {
        try {
            if (!comentarioId) {
                console.log('El comentarioId es undefined o nulo.');
                return;
            }
    
            const url = `http://localhost:3000/comentarios/${comentarioId}`;
            const respuesta = await axios.delete(url);
    
            if (respuesta.status === 200) {
                await traerComentarios();
            } else {
                console.log('Ocurrió un error inesperado al eliminar el comentario 1');
            }
        } catch (error) {
            console.log('Ocurrió un error inesperado al eliminar el comentario 2', error);
        } finally {
            // Limpiar el ID del comentario después de realizar las operaciones necesarias
            limpiarIdComentario();
        }
    };
    
    return (
        



        <Card.Body>
           <Card>
            <img src={imagenURL} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '200px' }}/>
            <Card.Body>
                <Card.Title className="titulo-historia">{titulo}</Card.Title>
                <Card.Text>
                    {descripcion}
                    <br />
                    <strong>Fecha de Creación:</strong>{' '}
                    {new Date(fechaCreacion).toLocaleString()}
                </Card.Text>
            </Card.Body>
            </Card>

            <br/>

            <Card>
            <Card.Body>
                <Card.Title>Comentarios</Card.Title>
                <Card.Body>
                    {comentarios.map((comentario, key) => (
                        <div key={key}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{comentario.autor.nombres + ' ' + comentario.autor.apellidos}</Card.Title>
                                    <Card.Text>ID del Comentario: {comentario._id}</Card.Text>
                                    <Card.Text>{comentario.descripcion}</Card.Text>
                                    {
                                        // Mostrar el botón solo si el comentario pertenece al usuario actual
                                        usuario && (comentario.autor?._id && usuario.id === comentario.autor._id) && (
                                            <Button variant="danger" onClick={() => {
                                                console.log("Comentario a eliminar:", comentario);
                                                console.log("ID del comentario a eliminar:", comentario._id);
                                                eliminarComentario(comentario._id);
                                            }}>
                                                Eliminar Comentario
                                            </Button>
                                        )
                                    }
                                </Card.Body>
                            </Card>
                            <br />
                        </div>
                    ))}

                        <br />

                        <Card>
                            <Card.Body>
                                <Card.Title>Agregar Comentario</Card.Title>
                                <br />
                                <FloatingLabel controlId="comentario" label="Comentario">
                                    <Form.Control
                                        onInput={(e) => setMiComentario(e.target.value)}
                                        value={miComentario}
                                        as="textarea"
                                        placeholder="Ingrese un comentario"
                                        style={{ height: '100px' }}
                                    />
                                </FloatingLabel>
                                <br />
                                <Button variant="primary" onClick={enviarComentario}>
                                    Comentar
                                </Button>
                            </Card.Body>
                        </Card>
                    </Card.Body>
                </Card.Body>
            </Card>
        </Card.Body>
    );
}

export default Ver;
