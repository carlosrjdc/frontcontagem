import Button from "@mui/material/Button";
import { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
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
      if (quantidade.length < 1) {
      } else {
        setEtapa(etapa + 1);
        setQuantidadeVazia("");
      }
    } else if (etapa === 4) {
      if (quantidade.length > 0) {
        Axios.put(`/atualizarcontagem/${idEndereco}`, {
          materialId: idSku,
          Quantidade: quantidade,
          Lote: lote,
          UnidadMedida: "cx",
        })
          .then((response) => {
            props.setarValor(
              data.filter((filtrar) => filtrar.id !== idEndereco)
            );
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
              container: "bottom-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true,
              },
            });
          })
          .catch((erro) => console.log(erro));
      } else {
        setQuantidadeVazia(
          "Favor prenche quantidade, caso não tenha nada digite 0"
        );
        setEtapa(3);
      }
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
          funcaoBlur={(e) => {
            if (e.key === "Enter") {
              localizarEndereco();
            }
          }}
          focar={true}
        />
      );
      break;
    case 1:
      input = (
        <div>
          <TextoInput
            label={"Produto"}
            valor={material}
            setValor={(e) => setMaterial(e.target.value)}
            funcaoBlur={(e) => {
              if (e.key === "Enter") {
                localizarEndereco();
              }
            }}
            tipo={"number"}
            focar={true}
          />
        </div>
      );
      break;
    case 2:
      input = (
        <TextoInput
          label={"Lote"}
          valor={lote}
          setValor={(e) => setLote(e.target.value)}
          funcaoBlur={(e) => {
            if (e.key === "Enter") {
              localizarEndereco();
            }
          }}
          tipo={"number"}
          focar={true}
        />
      );
      break;
    case 3:
      input = (
        <div>
          <div style={{ with: "1px" }}>
            <input
              disabled={true}
              style={{ width: "0.1%", border: "0px solid " }}
            ></input>
          </div>
          <TextoInput
            label={"Quantidade"}
            valor={quantidade}
            setValor={(e) => setQuantidade(e.target.value)}
            funcaoBlur={(e) => {
              if (e.key === "Enter") {
                localizarEndereco();
              }
            }}
            tipo={"number"}
            focar={true}
          />
        </div>
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
      <div style={{ padding: "4%", marginTop: "5%" }}>{input}</div>
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
        <div style={{ padding: "2%", marginBottom: "5%  " }}>
          Pendente contagem: <br></br>
          {data.length}
        </div>
        <Button onClick={localizarEndereco} variant="contained" size="large">
          {etapa === 4 ? "Finalizar" : "Proximo"}
        </Button>
        <br></br>
        <br></br>
        <div style={{ marginTop: "5%" }}>
          <Button
            disabled={data.length > 0}
            onClick={localizarEndereco}
            variant="contained"
            size="large"
          >
            Finalizar Contagem
          </Button>
        </div>

        <div style={{ marginTop: "60%" }}>
          <StepperCadastro verEtapa={etapa} />
        </div>
      </div>
    </div>
  );
}
