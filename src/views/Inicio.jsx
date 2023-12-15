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

<div style={{ backgroundImage: "url(https://img.freepik.com/foto-gratis/retrato-fotografa-caminando-ciudad-camara-profesional-tomando-fotografias_1258-196297.jpg?w=1380&t=st=1702672195~exp=1702672795~hmac=6b493e6d2ceefcf1b231a3d44e1092e59df308942aa5d8466edcbf7e4a588253)", backgroundSize: 'cover', height: '500px', marginBottom:'100px', backgroundPosition: 'center'}}>
  
    </div>
<div>
<h6 style={{backgroundColor: '#ffc107', textAlign:'center', fontSize: '17px', padding:'100px'}}>  ¡A desempolvar esos teclados y a compartir esas postales vivientes que nos regala este mundo! Nos vemos en el camino. 🌍🤙 </h6>
</div>
    
        
        <TablaDeDatos lista={lista} usuario={usuario} />
        <footer class="fixed-bottom bg-dark text-white text-center p-3">
    © 2023 Comision 04 / Tramo III Epica Arg. Programa
  </footer>
    
    </>
  )
}

export default Inicio

