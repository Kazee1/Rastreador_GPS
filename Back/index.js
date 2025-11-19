import express from "express";
import cors from "cors";
import routes from "./routes/rotas.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// rotas
routes(app);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});