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
      <div>{props.itens}</div>
      <div>{props.nomesku}</div>
      <div>{props.lotes}</div>
      <div>{props.quantidades}</div>
    </div>
  );
}
