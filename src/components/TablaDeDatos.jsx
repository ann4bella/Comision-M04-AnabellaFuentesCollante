import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PublicacionCard = ({ publicacion, usuario, onEliminar }) => {
  const navigate = useNavigate();

  const ver = () => {
    navigate('/ver/' + publicacion._id);
  }

  const editar = () => {
    navigate('/editar/' + publicacion._id);
  }

  const handleEliminar = () => {
    onEliminar(publicacion._id);
  }

  return (
    <Card style={{ width: '20%', margin: '1%' }}>
      <Card.Img variant="top" src={publicacion.imagenURL} alt="Imagen de la publicación" onClick={ver} />
      <Card.Body>
        <Card.Title onClick={ver}>{publicacion.titulo}</Card.Title>
        <Card.Subtitle>{publicacion.autor ? ` ${publicacion.autor.nombres || ''}` : 'N/A'}</Card.Subtitle>
        {publicacion.autor && publicacion.autor.imagenURL && (
          <Image src={publicacion.autor.imagenURL} alt="Foto del autor" roundedCircle style={{ width: '50px', height: '50px', marginTop: '10px' }} />
        )}
        <Dropdown className="mb-2">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Opciones
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={ver}>Ver</Dropdown.Item>
            {usuario && publicacion.autor?._id && usuario.id === publicacion.autor._id && (
              <>
                <Dropdown.Item onClick={editar}>Editar</Dropdown.Item>
                <Dropdown.Item onClick={handleEliminar}>Eliminar</Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
    </Card>
  );
};

const TablaDeDatos = ({ lista, usuario, onEliminar }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {lista.map((item, key) => (
        <PublicacionCard key={key} publicacion={item} usuario={usuario} onEliminar={onEliminar} />
      ))}
    </div>
  );
}

export default TablaDeDatos;
