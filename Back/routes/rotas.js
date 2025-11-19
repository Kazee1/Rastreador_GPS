import express from "express";
import cors from "cors";
import {
  registro,
  login,
  entrar_organizacao,
  authMiddleware,
  PegarDadosCliente,
  EditarCliente,
  DeletarCliente,
  PegarDadosCompromissos,
  EditarAgenda,
  DeletarAgenda,
  novaAgenda,
  CarregarArquivo,
  UploadArquivo,
  EditarDocumento,
  DeletarDocumento,
  pegarDocumentoCliente,
  PegarDocumentoReuniao,
  listarFinanceiros,
  deletarFinanceiro,
  atualizarFinanceiro,
  buscarFinanceiro,
  criarFinanceiro,
  registro_organizacao,
} from "../controllers/controller.js";

const routes = (app) => {
  app.use(express.json());
  app.post("/api/registro", registro);
  app.post("/api/login", login);
  app.post("/api/organizacao", registro_organizacao);
  app.post("/api/organizacao/verificar", entrar_organizacao);
  app.put("/api/clientes/:id", EditarCliente);
  app.delete("/api/clientes/:id", DeletarCliente);
  app.post("/api/agendas", novaAgenda);
  app.get("/api/agendas", PegarDadosCompromissos);
  app.put("/api/agendas/:id", EditarAgenda);
  app.delete("/api/agendas/:id", DeletarAgenda);
  //até aqui perfeito
  app.get("/uploads/:filename", UploadArquivo);
  
};

export default routes;
