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
      <div>{props.enderecos}</div>
      <br></br>
      <div>{props.itens}</div>
      <br></br>
      <div>{props.nomesku}</div>
      <br></br>
      <div>{props.lotes}</div>
      <br></br>
      <div>{props.quantidades}</div>
    </div>
  );
}
