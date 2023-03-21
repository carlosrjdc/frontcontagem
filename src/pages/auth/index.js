import { useNavigate } from "react-router-dom";
import FormAutenticar from "./formAuth/formAuth";
import "./Autenticar.css";

export default function Autenticacao() {
  return (
    <div className="ContainerAuth">
      <FormAutenticar />
    </div>
  );
}
