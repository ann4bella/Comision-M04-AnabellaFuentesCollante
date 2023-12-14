// BotonesDeAccion.jsx
import React from 'react';
import Button from 'react-bootstrap/Button';

const BotonesDeAccion = ({ autor, usuario, onEditar, onEliminar }) => {
    return (
      <>
        {usuario && autor && autor._id && usuario.id === autor._id && (
          <>
            <Button variant="primary" onClick={onEditar}>
              Editar
            </Button>
            <Button variant="danger" onClick={onEliminar}>
              Eliminar
            </Button>
          </>
        )}
      </>
    );
  };

export default {BotonesDeAccion}
