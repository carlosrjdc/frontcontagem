import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import Paper from "@mui/material/Paper";
import { useRef, useState, useEffect } from "react";
import CadastroContagem from "./CadastroContagem";
import ListaDemanda from "./ListaDemanda";
import Axios from "../../API/config";
import StepperCadastro from "./StepperCadastro";

export default function SubMenuContagem() {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  let dadosId = location.state.dados;
  var verid = sessionStorage.getItem("id");

  const [dados, setDados] = useState([]);

  useEffect(() => {
    if (verid) {
      Axios.get(`/registroconferenciaemaberto/${dadosId}`)
        .then((response) => setDados(response.data))
        .catch((erro) => console.log(erro));
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      {value === 0 ? (
        <CadastroContagem data={dados} setarValor={setDados} />
      ) : (
        <ListaDemanda data={dados} />
      )}

      <Box sx={{ pb: 7 }} ref={ref}>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Cadastro" />
            <BottomNavigationAction label="Lista" />
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
}
