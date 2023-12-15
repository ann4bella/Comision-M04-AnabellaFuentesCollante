import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
//import axios from 'axios';

import { useAuthContext } from '../context/AuthContext.jsx';

import TablaDeDatos from './../components/TablaDeDatos.jsx';

const Inicio = () => {
  const [lista, setLista] = useState([]);

  const { usuario } = useAuthContext();

  const cargarLista = async () => {
    const url = 'http://localhost:3000/publicaciones';

    //const respuesta = await axios.get(url);
    let respuesta = await fetch(url);

    if (respuesta.status === 200) {
      respuesta = await respuesta.json();

      setLista(respuesta);
    }
  }

  useEffect(() => {
    cargarLista();
  }, []);

  return (
<>
<div style={{ backgroundImage: "url(https://tuki-socks.com.ar/wp-content/uploads/2023/12/home.jpg)", backgroundSize: 'cover', height: '800px' }}>
    </div>

    <Card.Body>
        <h2>{ usuario ? ('Hola ' + usuario.nombres + '!') : 'Pensas crear una publicación? Registrate' }</h2>
        <TablaDeDatos lista={lista} usuario={usuario} />
    </Card.Body>
    </>
  )
}

export default Inicio

