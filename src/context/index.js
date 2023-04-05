import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function InfoProvider({ children }) {
  const [idDemandaInventario, setIdDemandaInventario] = useState("");

  return (
    <GlobalContext.Provider
      value={{ idDemandaInventario, setIdDemandaInventario }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
