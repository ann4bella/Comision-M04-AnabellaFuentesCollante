import React from 'react';
import Card from 'react-bootstrap/Card';
import { Image, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PublicacionCard = ({ publicacion, usuario, }) => {
  const navigate = useNavigate();

  const ver = () => {
    navigate('/ver/' + publicacion._id);
  }

  const editar = () => {
    navigate('/editar/' + publicacion._id);
  }

  const eliminar = () => {
    navigate('/eliminar/' + publicacion._id);
  }

  return (
    <Card className="mb-40" style={{ width: '22%', height: '450px', marginRight:'30px', marginBottom:'30px'}}>
      <Card.Img className="mb-40" variant="top" src={publicacion.imagenURL} alt="Imagen de la publicación" onClick={ver} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body style={{ display: 'flex', alignItems: 'center'}}>
    {publicacion.autor && publicacion.autor.imagenURL && (
      <Image src={publicacion.autor.imagenURL} alt="Foto del autor" roundedCircle style={{ width: '50px', height: '50px', marginRight: '10px' }} />
    )}
    <div>
      <Card.Subtitle>{publicacion.autor ? ` ${publicacion.autor.nombres || ''}` : 'N/A'}</Card.Subtitle>
    </div>
  </Card.Body>
      
      <Card.Body>
        
        <Card.Title onClick={ver}>{publicacion.titulo}</Card.Title>

        {/* Grupo de botones con borde gris */}
      <ButtonGroup>
        <Button variant="outline-secondary" onClick={ver}>
          Ver
        </Button>
        {usuario && publicacion.autor?._id && usuario.id === publicacion.autor._id && (
          <>
            <Button variant="outline-secondary" onClick={editar}>
              Editar
            </Button>
            <Button variant="outline-secondary" onClick={eliminar}>
              Eliminar
            </Button>
          </>
        )}
      </ButtonGroup>
       
      </Card.Body>
    </Card>
  );
};

const NuevaTablaDeDatos = ({ lista, usuario, onEliminar }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {lista.map((item, key) => (
        <PublicacionCard key={key} publicacion={item} usuario={usuario} onEliminar={onEliminar} />
      ))}
    </div>
  );
}

export default NuevaTablaDeDatos;
