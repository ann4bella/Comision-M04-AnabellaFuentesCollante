import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import DefaultLayout from '../layouts/DefaultLayout';
import 'bootstrap/dist/css/bootstrap.min.css';


import { rutas } from '../router';

const App = () => {
  return (
    <AuthProvider>
      <DefaultLayout>
        <RouterProvider router={rutas} />
      </DefaultLayout>
    </AuthProvider>
  );
}

export default App