import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Autenticacao from "../pages/auth";
import CadastroDemanda from "../pages/CadastroDemandas";
import CadastrarInventario from "../pages/CadastroInventario";
import ResultadoContagem from "../pages/ResultadoContagem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CadastrarInventario />,
  },

  {
    path: "/auth",
    element: <Autenticacao />,
  },
  {
    path: "/listainventario",
    element: <CadastroDemanda />,
  },
  {
    path: "/cadastroinventario",
    element: <CadastrarInventario />,
  },
  {
    path: "/resultadocontagem",
    element: <ResultadoContagem />,
  },
]);

export default router;
