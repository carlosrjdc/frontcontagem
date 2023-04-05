import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import moment from "moment-timezone";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import Axios from "../../API/config";

export default function CadastroDemanda() {
  const [Corredor, setCorredor] = useState("");
  const [Zona, setZona] = useState("");
  const [Nivel, setNivel] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [dadosUsuario, setDadosUsuario] = useState({});
  const [dadosDemadandaId, setDadosDemandaID] = useState([]);
  const { idDemandaInventario } = useContext(GlobalContext);

  async function buscarDemandasPorId() {
    await Axios.get(`/demandaporid/${idDemandaInventario}`).then((response) => {
      setDadosDemandaID(response.data);
    });
  }

  async function buscarUsuarios() {
    await Axios.get(`/usuarios`).then((response) => {
      setUsuarios(response.data);
    });
  }
  const dadosInput = () => {
    let valorInput = {};
    if (Nivel !== "" && Corredor === "") {
      return { Zona, Nivel };
    } else if (Corredor !== "" && Nivel === "") {
      return { Zona, Corredor };
    } else if (Corredor !== "" && Nivel !== "") {
      return { Zona, Corredor, Nivel };
    } else {
      return { Nivel };
    }
    return valorInput;
  };

  async function cadastrarNovaDemanda() {
    await Axios.post(`/newdemanda`, {
      conferenteId: dadosUsuario.id,
      inventarioDemandaId: idDemandaInventario,
      Data: moment(new Date()).format("YYYY-MM-DD"),
      Status: "Diaria",
    }).then((response) => {
      Axios.post(
        `/newcontagem/${idDemandaInventario}/${response.data.id}/${dadosUsuario.id}`,
        dadosInput()
      ).then((response) => {
        setDadosUsuario({});
        buscarDemandasPorId();
      });
    });
  }

  useEffect(() => {
    buscarUsuarios();
    buscarDemandasPorId();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ padding: "0.5%", display: "flex", alignItems: "center" }}>
          <div style={{ margin: "0.2%" }}>
            <Form.Select
              onChange={(e) => setZona(e.target.value)}
              aria-label="Default select example"
            >
              <option value="">Camara</option>
              <option value="A"> Refrigerado - Itambé</option>
              <option value="B">Refrigerado - Lactalis</option>
              <option value="C">Seco - Todos</option>
            </Form.Select>
          </div>
          <div style={{ margin: "0.2%" }}>
            <Form.Select
              onChange={(e) => setCorredor(e.target.value)}
              aria-label="Default select example"
            >
              <option value="">Rua</option>
              <option value="001"> Rua 1</option>
              <option value="002">Rua 2</option>
              <option value="003">Rua 3</option>
              <option value="004">Rua 4</option>
            </Form.Select>
          </div>
          <div style={{ margin: "0.2%" }}>
            <Form.Select
              onChange={(e) => setNivel(e.target.value)}
              aria-label="Default select example"
            >
              <option value="">Nivel</option>
              <option value="10"> Nivel 1</option>
              <option value="20">Nivel 2</option>
              <option value="30">Nivel 3</option>
              <option value="40">Nivel 4</option>
              <option value="50">Nivel 5</option>
            </Form.Select>
          </div>
          <div style={{ marginLeft: "5%" }}>
            <Button
              onClick={cadastrarNovaDemanda}
              disabled={
                Zona === "" ||
                dadosUsuario.id === null ||
                dadosUsuario.id === undefined ||
                dadosUsuario.id === ""
              }
              variant="secondary"
              size="sm"
            >
              Cadastrar Novo Inventario
            </Button>
          </div>
        </div>
        <div
          style={{ marginRight: "5%", fontWeight: "bold", fontSize: "20px" }}
        >
          ID DEMANDA DO INVENTARIO: {idDemandaInventario}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "60%" }}>
          {dadosDemadandaId.map((item) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1%",
                margin: "0.5%",
                background: "#bccae6",
                borderRadius: "4px",
                fontWeight: "bold",
              }}
            >
              <div>ID: {item.id}</div>
              <div>Data:{item.Data}</div>
              <div>Tipo: {item.Status}</div>
              <div>Conferente: {item.conferenteId}</div>
            </div>
          ))}
        </div>

        <div style={{ marginLeft: "5%", width: "38%" }}>
          <div
            style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "2%" }}
          >
            Operador Selecionado: {dadosUsuario.nome}
          </div>
          {usuarios.map((user) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                background: "#bccae6",
                margin: "0.5%",
                paddingLeft: "1.5%",
                paddingRight: "1.5%",
                cursor: "pointer",
              }}
              onClick={() => {
                setDadosUsuario(user);
              }}
            >
              <div>{user.id}</div>
              <div>{user.usuario}</div>
              <div>{user.nome}</div>
              <div>{user.cargo}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
