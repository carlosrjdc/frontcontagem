import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./formAuth.css";
import { useNavigate } from "react-router-dom";
import TextoInput from "../../../Components/InputTexto";
import { useState } from "react";
import Axios from "../../../API/config";

export default function FormAutenticar() {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function Autenticar() {
    Axios.post("user/auth", {
      Usuario: matricula,
      Senha: senha,
    }).then((response) => {
      navigate("/demandaconferente");
      sessionStorage.setItem("id", response.data.user);

      console.log(response.data);
    });
  }

  return (
    <div style={{ padding: "2%", marginTop: "15%" }}>
      LOGIN
      <div>
        <div style={{ marginBottom: "6%" }}>
          <TextoInput
            label={"Usuario"}
            valor={matricula}
            setValor={(e) => setMatricula(e.target.value)}
          />
        </div>
        <TextoInput
          label={"Senha"}
          valor={senha}
          setValor={(e) => setSenha(e.target.value)}
          tipo={"password"}
        />
        <Button onClick={Autenticar} variant="contained" size="large">
          Login
        </Button>
      </div>
    </div>
  );
}
