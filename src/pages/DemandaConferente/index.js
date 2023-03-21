import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Axios from "../../API/config";

export default function DemandaConferente() {
  const [dados, setDados] = useState([]);
  var verid = sessionStorage.getItem("id");

  const navigate = useNavigate();

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
      {dados.map((item) => {
        return (
          <div
            style={{
              padding: "4%",
              background: "#97d8ea",
              margin: "1%",
              borderRadius: "2%",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/submenu", { state: { dados: item.id } });
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
