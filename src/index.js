import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import router from "./routes";
import "./index.css";
import App from "./App";
import "react-notifications-component/dist/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReactNotifications />
    <RouterProvider router={router} />
  </React.StrictMode>
);
