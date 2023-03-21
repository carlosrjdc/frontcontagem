export default function ListaDemanda(props) {
  const { data } = props;

  return (
    <div>
      {data.map((item) => {
        return (
          <div
            style={{
              padding: "4%",
              margin: "1%",
              background: "#97d8ea",
              borderRadius: "4px",
            }}
            key={item.id}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2%",
              }}
            >
              <div style={{ fontWeight: "bold" }}>{item.Endereco}</div>
              <div style={{ fontWeight: "bold", color: "red" }}>
                Predio: {item.Predio}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Corredor: {item.Corredor}</div>
              <div>Nivel: {item.Nivel}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
