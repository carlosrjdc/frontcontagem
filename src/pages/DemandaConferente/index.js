import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Axios from "../../API/config";
import ModalConfirmacao from "../../Components/ModalConfirmacao";

export default function DemandaConferente() {
  const [dados, setDados] = useState([]);
  const [ver, setVer] = useState(false);
  const [identificador, setIdentificador] = useState("");

  var verid = sessionStorage.getItem("id");

  const navigate = useNavigate();

  function iniciarContagem() {
    Axios.put(`/atualizardemanda/${identificador}`, {
      Status: "Em Contagem",
      Iniciado: new Date(),
    })
      .then(console.log("ok"))
      .catch((erro) => console.log(erro));
    console.log(identificador);
    setVer(false);
    navigate("/submenu", { state: { dados: identificador } });
  }

  useEffect(() => {
    if (verid) {
      Axios.get(`/buscardemandas/1/Não iniciado`).then((response) =>
        setDados(response.data)
      );
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <ModalConfirmacao
        abrir={ver}
        setAbrir={setVer}
        validar={iniciarContagem}
      />
      {dados.map((item) => {
        return (
          <div
            style={{
              padding: "4%",
              background: item.Status === "Em Contagem" ? "#f4ff2a" : "#97d8ea",
              margin: "1%",
              borderRadius: "2%",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => {
              setIdentificador(item.id);
              item.Status === "Não iniciado"
                ? setVer(true)
                : navigate("/submenu", { state: { dados: item.id } });
              //navigate("/submenu", { state: { dados: item.id } });
            }}
          >
            Inventario ID: {item.inventarioDemandaId}
            <br></br>
            Status: {item.Status}
          </div>
        );
      })}
    </div>
  );
}
