import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import TextoInput from "../../Components/InputTexto";
import ContagemConcluir from "./Concluir";

export default function Contagem(props) {
  const [etapa, setEtapa] = useState(0);
  const [material, setMaterial] = useState("");
  const [lote, setLote] = useState("");
  const [endereco, setEndereco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  let input = "";

  switch (etapa) {
    case 0:
      input = (
        <TextoInput
          label={"Endereço"}
          valor={endereco}
          setValor={(e) => setEndereco(e.target.value)}
        />
      );
      break;
    case 1:
      input = (
        <TextoInput
          label={"Produto"}
          valor={material}
          setValor={(e) => setMaterial(e.target.value)}
        />
      );
      break;
    case 2:
      input = (
        <TextoInput
          label={"Lote"}
          valor={lote}
          setValor={(e) => setLote(e.target.value)}
        />
      );
      break;
    case 3:
      input = (
        <TextoInput
          label={"Quantidade"}
          valor={quantidade}
          setValor={(e) => setQuantidade(e.target.value)}
        />
      );
      break;
    case 4:
      input = (
        <ContagemConcluir
          itens={material}
          enderecos={endereco}
          lotes={lote}
          quantidades={quantidade}
        />
      );
      break;

    default:
      input = "";
  }

  return (
    <div>
      {input}

      <Button
        onClick={() => setEtapa(etapa + 1)}
        variant="contained"
        size="large"
      >
        Proximo
      </Button>
    </div>
  );
}
