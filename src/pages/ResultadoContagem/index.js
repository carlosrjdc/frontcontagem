import Table from "@mui/material/Table";
import Form from "react-bootstrap/Form";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import Axios from "../../API/config";

export default function ResultadoContagem() {
  const { idDemandaInventario } = useContext(GlobalContext);
  const [dadosContagem, setDadosContagem] = useState([]);

  async function AtualizarContagem() {
    Axios.get(`/listarcontagempordemanda/${idDemandaInventario}`).then(
      (response) => {
        setDadosContagem(response.data);
      }
    );
  }

  useEffect(() => {
    AtualizarContagem();
  }, []);

  return (
    <div>
      <Form
        action={`https://backcontagem.vercel.app/excel/${idDemandaInventario}`}
        method="GET"
      >
        <div
          style={{
            margin: "0.5%",
            lefet: 0,
            display: "block",
            marginLeft: "80%",
          }}
        >
          <div style={{ display: "flex" }}>
            <Button
              style={{ margin: "1%" }}
              onClick={AtualizarContagem}
              variant="secondary"
              size="sm"
            >
              Atualizar Contagem
            </Button>
            <Button
              style={{ margin: "1%" }}
              type="submit"
              variant="secondary"
              size="sm"
            >
              Baixar Contagem
            </Button>
          </div>
        </div>
      </Form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Endereço</TableCell>
              <TableCell align="center">Sku</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Lote</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Unidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dadosContagem.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.Endereco}</TableCell>

                <TableCell align="center">{row?.skuContagem?.Sku}</TableCell>
                <TableCell align="center">
                  {row?.skuContagem?.Descricao}
                </TableCell>
                <TableCell align="center">{row.Lote}</TableCell>
                <TableCell align="center">{row.Quantidade}</TableCell>
                <TableCell align="center">{row.Unidade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
