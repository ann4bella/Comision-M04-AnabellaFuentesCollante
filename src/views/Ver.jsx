import { useState, useEffect } from 'react';
import { Card, Button, FloatingLabel, Form, Dropdown, Image  } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
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
        } 
    };
    
    return (
        
        <Card.Body>
           <Card>
            <img className="centrar-imagen" src={imagenURL} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'cover', objectPosition: 'center' }}/>
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
                <Card.Body >
                    {comentarios.map((comentario, key) => (
                        <div key={key}>
                            <Card className='fondoDeComentarios'>
                            <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                                {/* Imagen del autor */}
                                {comentario.autor.imagenURL && (
                                    <Image src={comentario.autor.imagenURL} roundedCircle style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                )}

                                {/* Título del autor */}
                                
                                <Card>
                                    <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                                        {/* Contenido principal */}
                                        <div style={{ flex: 1 }}>
                                            <Card.Title>{comentario.autor.nombres}</Card.Title>
                                            <Card.Text>{comentario.descripcion}</Card.Text>
                                        </div>

                                        {/* Menú desplegable con los tres puntos */}
                                        {usuario && (comentario.autor?._id && usuario.id === comentario.autor._id) && (
                                            <Dropdown>
                                                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                                                 </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {/* Opciones dentro del menú desplegable */}
                                                    <Dropdown.Item onClick={() => eliminarComentario(comentario._id)}>
                                                        Eliminar Comentario
                                                    </Dropdown.Item>
                                                    {/* Puedes agregar más opciones aquí si es necesario */}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        )}
                                    </Card.Body>
                                </Card>
                                
                            </Card.Body>
                        </Card>
                        
                        </div>
                    ))}

                        <br />

                        <Card>
                            <Card.Body>
                                
                                <FloatingLabel controlId="comentario" label="Deja tu comentario">
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
