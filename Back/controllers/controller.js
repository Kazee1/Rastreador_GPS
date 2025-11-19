import { validarEnc } from "../auth-sec/auth/enc.js";
import { CriarToken, VerificarToken } from "../auth-sec/auth/token.js";
import {
  criarUsuario,
  verifica_user,
  criarorganizacao,
  verifica_organizacao,
  entrarorg,
  
  modificarCliente,
  deletarCliente,
  criarAgenda,
  pegarAgenda,
  modificarAgenda,
  deletarAgenda,
  deletarDocumento,
  criarDocumento,
  pegarDocumentosPorCliente,
  pegarDocumentosComReuniao,
  modificarDocumento,
  pegarDocumentoPorId,
  findDocumento,
  listarMongoFinanceiros,
  pegarMongoFinanceiro,
  criarMongoFinanceiro,
  modificarMongoFinanceiro,
  deletarMongoFinanceiro,
  verificarVencidos,
  
  
} from "../models/bancomongo.js";
import fs from "fs";
import mime from "mime";
import crypto from "crypto";
import {
  decifrarArquivo,
  decifrarTexto,
  encriptarArquivo,
  encriptarTexto,
} from "../auth-sec/sec/doccry.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const key = crypto.createHash("sha256").update(process.env.KEY).digest();
import jwt from "jsonwebtoken";

const SECRET = "sua_chave_secreta_123"; // ideal colocar em variável de ambiente
export async function registro(req, res) {
  try {
    const novoUsuario =  req.body;
    const usuarioCriado = await criarUsuario(novoUsuario);
    
      const token = jwt.sign(
      { id: usuarioCriado._id },
      SECRET,
      { expiresIn: "7d" } // expira em 7 dias
      );
      
      return res.json({
      status: "ok",
      token,
      user: usuarioCriado, // opcional
      });
    // exemplo de resposta
    res.status(200).json(usuarioCriado);
  } catch (err) {
    console.error("Erro ao salvar usuario:", err);
    res
      .status(500)
      .json({ message: "Erro ao salvar o usuario", error: err.message });
  }
}

export async function login(req, res) {
  try {
    const user = req.body;
    console.log(user);
    const usuarioEncontrado = await verifica_user(user);
    if (usuarioEncontrado){
      const token = jwt.sign(
      { id: usuarioEncontrado._id },
      SECRET,
      { expiresIn: "7d" } // expira em 7 dias
      );
      
      return res.json({
      status: "ok",
      token,
      user: usuarioEncontrado, // opcional
      });
    }
    else{
      console.log("não entrou");
      return res.json({status: "no"})
    }

  } catch (err) {
    console.error("Erro na autentificação", err);
    return res.status(500).json({ messege: "Erro Interno" });
  }
}

export async function registro_organizacao(req, res) {
  try {
    const novoorganizacao =  req.body;
    const organizacaoCriado = await criarorganizacao(novoorganizacao);
    

    // exemplo de resposta
    res.status(200).json(organizacaoCriado);
  } catch (err) {
    console.error("Erro ao salvar cliente:", err);
    res
      .status(500)
      .json({ message: "Erro ao salvar o cliente", error: err.message });
  }
}

export async function entrar_organizacao(req, res) {
  try {
    const { codigo } = req.body;

    // tentar pegar o token, mas NÃO obrigar
    let userId = null;

    const authHeader = req.headers.authorization;
    if (authHeader) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, SECRET);
        userId = decoded.id;
      } catch (err) {
        console.log("Token inválido (mas não bloquear)", err.message);
      }
    }

    console.log("userId extraído do token:", userId);
    console.log(codigo);
    // Verifica se a organização existe
    const org = await verifica_organizacao(codigo);

    if (!org) {
      return res.json({ status: "no", message: "Código inválido" });
    }

    // Se tiver userId, atualiza o usuário na organização
    if (userId) {
      console.log("entrando user");
      const a = await entrarorg(userId, org);
      if(a){
        console.log("organização na pessoa");
      }
      else{
        console.log("erro");
      }
    }

    return res.json({
      status: "ok",
      message: "Organização encontrada",
      organizacao: org.nome,
      userId: userId ?? null
    });

  } catch (err) {
    console.error("Erro ao entrar na organização:", err);
    return res.status(500).json({ message: "Erro interno" });
  }
}

export function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token não enviado" });
    }

    const decoded = jwt.verify(token, "sua_chave_secreta_123"); // MESMO segredo do login
    req.userId = decoded.id; // salva o id dentro da req
    next();

  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

export async function PegarDadosCliente(req, res) {
  try {
    const cliente = await pegarCliente(req.params.id);
    if (!cliente)
      return res.status(404).json({ message: "Cliente não encontrado" });
    res.json(cliente);
  } catch (err) {
    console.error("Erro ao buscar cliente:", err);
    res
      .status(500)
      .json({ message: "Erro ao buscar cliente", error: err.message });
  }
}

export async function EditarCliente(req, res) {
  try {
    const cliente = await modificarCliente(req.params.id, req.body);
    if (cliente.modifiedCount === 0)
      return res.status(404).json({ message: "Cliente não encontrado" });
    res.status(200).json(cliente);
  } catch (err) {
    console.error("Erro ao atualizar cliente:", err);
    res
      .status(500)
      .json({ message: "Erro ao atualizar cliente", error: err.message });
  }
}

export async function DeletarCliente(req, res) {
  try {
    const cliente = await deletarCliente(req.params.id);
    if (cliente.modifiedCount === 0)
      return res.status(404).json({ message: "Cliente não encontrado" });
    res.status(200).json({ message: "Cliente excluído com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir cliente:", err);
    res
      .status(500)
      .json({ message: "Erro ao excluir o cliente", error: err.message });
  }
}

// Agenda
export async function novaAgenda(req, res) {
  try {
    const AgendaCriada = await criarAgenda({ ...req.body });
    res.status(200).json(AgendaCriada);
  } catch (err) {
    console.error("Erro ao salvar agenda:", err);
    res
      .status(500)
      .json({ message: "Erro ao salvar o agenda", error: err.message });
  }
}

export async function PegarDadosCompromissos(req, res) {
  try {
    const agendas = await pegarAgenda();
    res.json(agendas);
  } catch (err) {
    res.status(500).json({
      message: "Erro ao carregar os compromissos",
      error: err.message,
    });
  }
}

export async function EditarAgenda(req, res) {
  try {
    const agenda = await modificarAgenda(req.params.id, req.body);
    if (agenda.modifiedCount === 0)
      return res.status(404).json({ message: "Agenda não encontrada" });
    res.status(200).json(agenda);
  } catch (err) {
    console.error("Erro ao atualizar agenda:", err);
    res
      .status(500)
      .json({ message: "Erro ao atualizar agenda", error: err.message });
  }
}

export async function DeletarAgenda(req, res) {
  try {
    const agenda = await deletarAgenda(req.params.id);
    if (agenda.modifiedCount === 0)
      return res.status(404).json({ message: "Agenda não encontrada" });
    res.status(200).json({ message: "Compromisso excluído com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir Compromisso:", err);
    res
      .status(500)
      .json({ message: "Erro ao excluir a agenda", error: err.message });
  }
}

export async function CarregarArquivo(req, res) {
  try {
    const tipoDocumento = req.body.tipoDocumento;
    const dados = JSON.parse(req.body.dados);
    const arquivo = req.file;

    const { nomeArquivo, url } = await encriptarArquivo(arquivo, key);

    const novoRegistro = {
      tipoDocumento,
      dados,
      nome: arquivo.originalname,
      nomeArquivo,
      url,
      dataEnvio: new Date().toISOString(),
    };
    const DocumentoCriado = await criarDocumento(novoRegistro);
    res
      .status(200)
      .json({ mensagem: "Documento criado", id: DocumentoCriado.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao criar documento" });
  }
}

export async function UploadArquivo(req, res) {
  const arquivo = req.params.filename;
  console.log("Tentando abrir no navegador:", arquivo);

  try {
    // 1. Decifrar nome original (removendo timestamp se existir)
    const nomeOriginalCompleto = decifrarTexto(arquivo, key);
    const nomeOriginal = nomeOriginalCompleto.includes("-")
      ? nomeOriginalCompleto.split("-").slice(1).join("-")
      : nomeOriginalCompleto;

    // 2. Buscar no Cloudinary
    const { secure_url } = await cloudinary.api.resource(
      `documentos_encriptados/${arquivo}`,
      { resource_type: "raw" }
    );

    // 3. Baixar o arquivo
    const response = await fetch(secure_url);
    const buffer = await response.arrayBuffer();
    const arquivoEnc = Buffer.from(buffer);

    // 4. Decifrar conteúdo
    const arquivoDec = await decifrarArquivo(arquivoEnc, key);

    // 5. Determinar tipo MIME
    const tipo = mime.getType(nomeOriginal) || "application/octet-stream";

    // 6. Configurar resposta para ABRIR no navegador
    res.setHeader("Content-Type", tipo);
    res.setHeader("Content-Disposition", `inline; filename="${nomeOriginal}"`);

    return res.send(arquivoDec);
  } catch (error) {
    console.error("Erro ao abrir arquivo:", error);
    return res.status(500).json({
      erro: "Falha ao exibir arquivo",
      detalhes: error.message,
    });
  }
}
export async function pegarDocumentoCliente(req, res) {
  try {
    console.log("entrou aqui");
    const clienteId = req.params.clienteId;
    let documento = await pegarDocumentosPorCliente(clienteId);
    console.log(documento);

    res.status(200).json(documento);
  } catch (err) {
    res.status(500).json({
      message: "Erro ao pegar os dados por cliente",
      error: err.message,
    });
  }
}

export async function PegarDocumentoReuniao(req, res) {
  try {
    let documento = await pegarDocumentosComReuniao();

    res.status(200).json(documento);
  } catch (err) {
    res.status(500).json({
      message: "Erro ao pegar os dados com reunião",
      error: err.message,
    });
  }
}
export async function EditarDocumento(req, res) {
  try {
    const id = req.params.id;
    const tipoDocumento = req.body.tipoDocumento;
    const dados = JSON.parse(req.body.dados);
    const novoarquivo = req.file;

    const documentopdf = await pegarDocumentoPorId(id);
    if (!documentopdf) {
      return res.status(404).json({ message: "Documento não encontrado" });
    }

    let nomeArquivo = documentopdf.nomeArquivo;
    let url = documentopdf.url;
    let nome = documentopdf.nome;

    // Se houver novo arquivo, atualiza
    if (novoarquivo) {
      // Deleta o arquivo anterior do Cloudinary
      if (documentopdf.nomeArquivo) {
        await cloudinary.uploader
          .destroy(`documentos_encriptados/${documentopdf.nomeArquivo}`, {
            resource_type: "raw",
          })
          .catch((err) => console.error("Erro ao deletar do Cloudinary:", err));
      }

      const encriptado = await encriptarArquivo(novoarquivo, key);
      nomeArquivo = encriptado.nomeArquivo;
      url = encriptado.url;
      nome = novoarquivo.originalname;
    }

    const novoRegistro = {
      tipoDocumento,
      dados,
      nome,
      nomeArquivo,
      url,
      dataEnvio: new Date().toISOString(),
    };

    let documento = await modificarDocumento(id, novoRegistro);
    if (documento.modifiedCount === 0) {
      return res.status(404).json({ message: "Documento não encontrado" });
    }

    res.status(200).json(documento);
  } catch (err) {
    console.error("Erro ao atualizar documento:", err);
    res
      .status(500)
      .json({ message: "Erro ao atualizar documento", error: err.message });
  }
}

export async function DeletarDocumento(req, res) {
  try {
    const id = req.params.id;
    console.log(id);
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Formato de ID inválido" });
    }

    const documentopdf = await pegarDocumentoPorId(id);
    console.log(documentopdf.nomeArquivo);
    if (!documentopdf) {
      return res.status(404).json({ message: "Documento não encontrado" });
    }

    if (documentopdf.nomeArquivo) {
      await cloudinary.uploader
        .destroy(`documentos_encriptados/${documentopdf.nomeArquivo}`, {
          resource_type: "raw",
        })
        .catch((err) => console.error("Erro ao deletar do Cloudinary:", err));
    }
    let documento = await deletarDocumento(id);

    if (documento.modifiedCount === 0) {
      return res.status(404).json({ message: "documento não encontrado" });
    }
    res.status(200).json({ message: "documento excluído com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir documento:", err);
    res
      .status(500)
      .json({ message: "Erro ao excluir o documento", error: err.message });
  }
}

// // Financeiro
export async function listarFinanceiros(req, res) {
  try {
    const finaceiros = await listarMongoFinanceiros();
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    //console.log(hoje.toISOString());
    
    //console.log("viu os financeiro");
    const vencidos = await verificarVencidos(hoje);
    res.status(200).json(finaceiros);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao carregar os financeiro", error: err.message });
  }

}

export async function buscarFinanceiro(req, res) {
  try {
    const financiero = await pegarMongoFinanceiro(req.params.id);
    if (!financiero)
      return res.status(404).json({ message: "financiero não encontrado" });
    res.json(financiero);
  } catch (err) {
    console.error("Erro ao buscar financiero:", err);
    res
      .status(500)
      .json({ message: "Erro ao buscar financiero", error: err.message });
  }

}

export async function criarFinanceiro(req, res) {
  try {
    const novo = { ...req.body,
      data_vencimento: new Date(req.body.data_vencimento),
      data_lancamento: new Date(req.body.data_lancamento), 
      _id: uuidv4()};
    const financeiroCriado = await criarMongoFinanceiro(novo);
    res.status(200).json(financeiroCriado);
  } catch (err) {
    console.error("Erro ao salvar financeiro:", err);
    res
      .status(500)
      .json({ message: "Erro ao salvar o financeiro", error: err.message });
  }

}

export async function atualizarFinanceiro(req, res) {
  try {
    const finaceiros = await modificarMongoFinanceiro(req.params.id, req.body);
    if (finaceiros.modifiedCount === 0)
      return res.status(404).json({ message: "finaceiros não encontrado" });
    res.status(200).json(finaceiros);
  } catch (err) {
    console.error("Erro ao atualizar finaceiros:", err);
    res
      .status(500)
      .json({ message: "Erro ao atualizar finaceiros", error: err.message });
  }

}

export async function deletarFinanceiro(req, res) {
  try {
    const finaceiros = await deletarMongoFinanceiro(req.params.id);
    if (finaceiros.modifiedCount === 0)
      return res.status(404).json({ message: "finaceiros não encontrado" });
    res.status(200).json({ message: "finaceiros excluído com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir finaceiros:", err);
    res
      .status(500)
      .json({ message: "Erro ao excluir o cliente", error: err.message });
  }

}
