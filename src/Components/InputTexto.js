import TextField from "@mui/material/TextField";

export default function TextoInput(props) {
  return (
    <div>
      <div
        style={{
          textAlign: "center",
          padding: "2%",
          fontWeight: "bold",
          fontSize: "30px",
          color: "red",
        }}
      >
        <div style={{ marginTop: "20%" }}>
          <TextField
            sx={{ marginBottom: "3%", marginTop: "2%" }}
            fullWidth
            id="standard-basic"
            label={props.label}
            variant="standard"
            value={props.valor}
            onChange={props.setValor}
            onBlur={props.funcaoBlur}
          />
        </div>
      </div>
    </div>
  );
}
