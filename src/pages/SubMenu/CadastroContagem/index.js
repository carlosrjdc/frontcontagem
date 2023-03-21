import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Axios from "../../../API/config.js";
import TextoInput from "../../../Components/InputTexto.js";
import StepperCadastro from "../StepperCadastro/index.js";
import ContagemConcluir from "./Concluir";
import { Store } from "react-notifications-component";

export default function CadastroContagem(props) {
  const [etapa, setEtapa] = useState(0);
  const [material, setMaterial] = useState("");
  const [lote, setLote] = useState("");
  const [endereco, setEndereco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [enderecoEncontrado, setEnderecoEncontrado] = useState("");
  const [skuencontrado, setSkuEncontrado] = useState("");
  const [loteInvalido, setLoteInvalido] = useState("");
  const [quantidadeVazia, setQuantidadeVazia] = useState("");

  const [idSku, setIdSku] = useState("");
  const [idEndereco, setIdEndereco] = useState("");
  const [descSku, setDescSku] = useState("");

  const { data } = props;

  async function localizarEndereco() {
    if (etapa === 0) {
      const verificarEndereco = await data.filter(
        (filtrar) => filtrar.Endereco == endereco
      );
      if (verificarEndereco.length > 0) {
        setIdEndereco(verificarEndereco[0].id);
        setEnderecoEncontrado("");
        setEtapa(1);
      } else {
        setEnderecoEncontrado("Endereço não consta na lista de demanda");
      }
    } else if (etapa === 1) {
      Axios.get(`/buscarmaterial/${material}`).then((response) => {
        if (response.data.length > 0) {
          setIdSku(response.data[0].id);
          setDescSku(response.data[0].Descricao);
          setEtapa(etapa + 1);
          setSkuEncontrado("");
        } else {
          setSkuEncontrado("Material não localizado");
        }
      });
    } else if (etapa === 2) {
      if (lote.length > 6) {
        setEtapa(etapa + 1);
        setLoteInvalido("");
      } else {
        setLoteInvalido("O Mininimo de caracteres são 6");
      }
    } else if (etapa === 3) {
      if (quantidade.length > 0) {
        setEtapa(etapa + 1);
        setQuantidadeVazia("");
      } else {
        setQuantidadeVazia(
          "Favor informar uma quantidade 'Se estiver vazio informar 0'"
        );
      }
    } else if (etapa === 4) {
      Axios.put(`/atualizarcontagem/${idEndereco}`, {
        materialId: idSku,
        Quantidade: quantidade,
        Lote: lote,
        UnidadMedida: "cx",
      })
        .then((response) => {
          props.setarValor(data.filter((filtrar) => filtrar.id !== idEndereco));
          setEtapa(0);
          setMaterial("");
          setLote("");
          setEndereco("");
          setQuantidade("");
          setEnderecoEncontrado("");
          setSkuEncontrado("");
          setLoteInvalido("");
          setQuantidadeVazia("");
          setIdSku("");
          setDescSku("");
          Store.addNotification({
            title: "Sucesso!",
            message: "Registro realizado com sucesso",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
        })
        .catch((erro) => console.log(erro));
    }
  }

  function cancelarRegistro() {
    setEtapa(0);
    setMaterial("");
    setLote("");
    setEndereco("");
    setQuantidade("");
    setEnderecoEncontrado("");
    setSkuEncontrado("");
    setLoteInvalido("");
    setQuantidadeVazia("");
    setIdSku("");
    setDescSku("");
  }

  let input = "";

  switch (etapa) {
    case 0:
      input = (
        <TextoInput
          label={"Endereço"}
          valor={endereco}
          setValor={(e) => setEndereco(e.target.value)}
          funcaoBlur={localizarEndereco}
        />
      );
      break;
    case 1:
      input = (
        <TextoInput
          label={"Produto"}
          valor={material}
          setValor={(e) => setMaterial(e.target.value)}
          funcaoBlur={localizarEndereco}
        />
      );
      break;
    case 2:
      input = (
        <TextoInput
          label={"Lote"}
          valor={lote}
          setValor={(e) => setLote(e.target.value)}
          funcaoBlur={localizarEndereco}
        />
      );
      break;
    case 3:
      input = (
        <TextoInput
          label={"Quantidade"}
          valor={quantidade}
          setValor={(e) => setQuantidade(e.target.value)}
          funcaoBlur={localizarEndereco}
        />
      );
      break;
    case 4:
      input = (
        <div>
          <ContagemConcluir
            itens={material}
            enderecos={endereco}
            lotes={lote}
            quantidades={quantidade}
            nomesku={descSku}
          />
          <div style={{ textAlign: "center" }}>
            <Button onClick={cancelarRegistro} variant="contained" size="large">
              Cancelar
            </Button>
          </div>
        </div>
      );
      break;

    default:
      input = "";
  }

  return (
    <div>
      <div>{input}</div>
      <div
        style={{
          marginTop: "4%",
          fontWeight: "bold",
          color: "red",
          fontSize: "16px",
        }}
      >
        {skuencontrado}
        {enderecoEncontrado}
        {loteInvalido}
        {quantidadeVazia}
      </div>
      <div style={{ textAlign: "center", marginTop: "15%" }}>
        <Button onClick={localizarEndereco} variant="contained" size="large">
          {etapa === 4 ? "Finalizar" : "Proximo"}
        </Button>

        <div style={{ marginTop: "60%" }}>
          <StepperCadastro verEtapa={etapa} />
        </div>
      </div>
    </div>
  );
}
