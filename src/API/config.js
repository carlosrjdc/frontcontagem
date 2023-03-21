import axios from "axios";

const Axios = axios.create({
  baseURL: "https://backcontagemestoque.vercel.app/",
  timeout: 50000,
  headers: { "X-Custom-Header": "foobar" },
});

export default Axios;
