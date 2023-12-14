// Importamos las dependencias necesarias de React Bootstrap y React Router DOM.
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom";

// Creamos un componente funcional llamado 'TablaDeDatos' que recibe 'props'.
const TablaDeDatos = (props) => {
    // Desestructuramos las propiedades 'lista' y 'usuario' de 'props'.
    const { lista, usuario } = props;

    // Utilizamos el hook 'useNavigate' de React Router DOM para manejar la navegación.
    const navigate = useNavigate();

    // Definimos la función 'ver' que navega a la página '/ver/{id}' al hacer clic en el botón 'Ver'.
    const ver = (id) => {
        navigate('/ver/' + id);
    }

    // Definimos la función 'editar' que navega a la página '/editar/{id}' al hacer clic en el botón 'Editar'.
    const editar = (id) => {
        navigate('/editar/' + id);
    }

    // Definimos la función 'eliminar' que navega a la página '/eliminar/{id}' al hacer clic en el botón 'Eliminar'.
    const eliminar = (id) => {
        navigate('/eliminar/' + id);
    }

    // Devolvemos la estructura de la tabla con los datos proporcionados en 'lista'.
    return (
        <Table striped bordered hover className="table-dark">
            <thead>
                {/* Definimos las columnas de la tabla */}
                <tr>
                    <th>#</th>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {/* Mapeamos los elementos de 'lista' para crear filas de la tabla */}
                {
                  lista.map((item, key) => (
                    <tr key={key}>
                        {/* Mostramos el número de la fila */}
                        <td>{ key + 1 }</td>
                        {/* Mostramos el título del item */}
                        <td>{ item.titulo }</td>
                        {/* Mostramos el nombre completo del autor o 'N/A' si no hay autor */}
                        <td>{ item.autor ? `${item.autor.apellidos || ''} ${item.autor.nombres || ''}` : 'N/A' }</td>
                        <td>
                                {/* Grupo de botones de acción (Ver, Editar, Eliminar) */}
                                <ButtonGroup style={{ maxWidth: '30px' }}>
                                    {/* Botón para ver detalles del elemento */}
                                    <Button variant="success" onClick={() => ver(item._id)}>
                                        Ver
                                    </Button>
                                    
                                    {/* 
                                        Mostramos los botones de Editar y Eliminar solo si hay un usuario 
                                        y si el autor del elemento coincide con el usuario actual.
                                    */}
                                    {
                                        usuario && (item.autor?._id && usuario.id === item.autor._id) && (
                                            <>
                                                {/* Botón para editar el elemento */}
                                                <Button variant="primary" onClick={() => editar(item._id)}>
                                                    Editar
                                                </Button>
                                                {/* Botón para eliminar el elemento */}
                                                <Button variant="danger" onClick={() => eliminar(item._id)}>
                                                    Eliminar
                                                </Button>
                                            </>
                                        )
                                    }
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}

// Exportamos el componente 'TablaDeDatos' para su uso en otras partes de la aplicación.
export default TablaDeDatos;
