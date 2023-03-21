import TextField from "@mui/material/TextField";

export default function TextoInput(props) {
  return (
    <div>
      <TextField
        sx={{ marginBottom: "3%", marginTop: "2%" }}
        fullWidth
        id="standard-basic"
        label={props.label}
        variant="standard"
        value={props.valor}
        onChange={props.setValor}
        onBlur={props.funcaoBlur}
        type={props.tipo}
      />
    </div>
  );
}
