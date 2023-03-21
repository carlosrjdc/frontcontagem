export default function ContagemConcluir(props) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "4%",
        marginTop: "3%",
        fontWeight: "bold",
        fontSize: "16px",
      }}
    >
      <div>Endereço: {props.enderecos}</div>
      <br></br>
      <div>Item: {props.itens}</div>
      <br></br>
      <div>Descrição: {props.nomesku}</div>
      <br></br>
      <div>Lote: {props.lotes}</div>
      <br></br>
      <div>Quantidade: {props.quantidades}</div>
    </div>
  );
}
