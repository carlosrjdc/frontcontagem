import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Autenticacao from "../pages/auth";
import Contagem from "../pages/Contagem";
import DemandaConferente from "../pages/DemandaConferente";
import SubMenuContagem from "../pages/SubMenu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Autenticacao />,
  },

  {
    path: "/auth",
    element: <Autenticacao />,
  },
  {
    path: "/demandaconferente",
    element: <DemandaConferente />,
  },
  {
    path: "/contagem",
    element: <Contagem />,
  },
  {
    path: "/submenu",
    element: <SubMenuContagem />,
  },
]);

export default router;
