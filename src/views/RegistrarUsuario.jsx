import { Card } from 'react-bootstrap';

import FormularioRegistrarUsuario from '../components/FormularioRegistrarUsuario.jsx';

const RegistrarUsuario = () => {
  return (
    <Card.Body>
      <p className="h1">Registrate</p>
      <FormularioRegistrarUsuario />
    </Card.Body>
  )
}

export default RegistrarUsuario
