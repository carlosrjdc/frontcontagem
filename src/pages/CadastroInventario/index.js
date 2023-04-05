import { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "../../API/config";
import moment from "moment-timezone";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { HiOutlineViewList } from "react-icons/hi";

import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../../context";

export default function CadastrarInventario() {
  const [dadosInventario, setDadosInventario] = useState([]);
  const [tipoInventario, setTipoInvetario] = useState("");
  const { idDemandaInventario, setIdDemandaInventario } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  async function AtualizardadosInventario() {
    await Axios.get("/inventariosemaberto").then((response) =>
      setDadosInventario(response.data)
    );
  }

  useEffect(() => {
    AtualizardadosInventario();
  }, []);

  async function CadastrarInventario() {
    await Axios.post("/newinventario", {
      registradoPor: 1,
      Data: moment(new Date()).format("YYYY-MM-DD"),
      Tipo: tipoInventario,
    }).then((response) => {
      setIdDemandaInventario(response.data.id);
      AtualizardadosInventario();
      navigate("/listainventario");
    });
  }

  return (
    <div>
      <div
        style={{
          padding: "0.5%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "0.2%" }}>
          <Form.Select
            onChange={(e) => setTipoInvetario(e.target.value)}
            aria-label="Default select example"
          >
            <option value="">Tipo Inventario</option>
            <option value="Diario"> Diario</option>
            <option value="Inventario">Inventario</option>
            <option value="Reconferencia">Reconferencia</option>
          </Form.Select>
        </div>
        <div>
          <Button
            disabled={tipoInventario === ""}
            variant="secondary"
            size="sm"
            onClick={CadastrarInventario}
          >
            Cadastrar Novo Inventario
          </Button>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Tipo</TableCell>
                  <TableCell align="center">Data</TableCell>
                  <TableCell align="center">Cadastrar Demanda</TableCell>
                  <TableCell align="center">Abrir Conferencia</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dadosInventario.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.Tipo}</TableCell>
                    <TableCell align="center">{row.Data}</TableCell>
                    <TableCell
                      align="center"
                      onClick={() => {
                        setIdDemandaInventario(row.id);
                        navigate("/listainventario");
                      }}
                    >
                      <HiOutlineViewGridAdd
                        style={{ cursor: "pointer" }}
                        size={20}
                        color="green"
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={() => {
                        setIdDemandaInventario(row.id);
                        navigate("/resultadocontagem");
                      }}
                    >
                      <HiOutlineViewList
                        style={{ cursor: "pointer" }}
                        size={20}
                        color="green"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
