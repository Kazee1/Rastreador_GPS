import ConectarBanco from "../config/dbconfig.js";
import "dotenv/config"
import { ObjectId } from "mongodb";

const conexao = await ConectarBanco(process.env.MongoConection);

export async function pegarClientes() {
    const db = conexao.db("banco");
    const collection = db.collection("clientes");
    // retornando todos os elementos em formato json
    return collection.find().toArray();
}

export async function criarUsuario(noveUsuario) {
    const db = conexao.db("banco");
    const collection = db.collection("usuarios");
    return collection.insertOne(noveUsuario);
}

export async function verifica_user(usuario) {
  const db = conexao.db("banco");
  const collection = db.collection("usuarios");

  // Buscar apenas por email
  const encontrado = await collection.findOne({ email: usuario.email });

  if (!encontrado) return false;

  // Comparar senha
  if (encontrado.senha === usuario.senha) {
    return true;
  }

  return false;
}

export async function pegarCliente(id) {
    const db = conexao.db("banco");
    const collection = db.collection("clientes");
    const objectId = ObjectId.createFromHexString(id);
    return collection.findOne({_id: new ObjectId(objectId)})
    
}
export async function modificarCliente(id, cliente) {
    const db = conexao.db("banco");
    const collection = db.collection("clientes");
    const objectId = ObjectId.createFromHexString(id);

    // Remove o _id do objeto para não dar problema
    const { _id, ...clienteSemId } = cliente;

    return collection.updateOne(
        { _id: new ObjectId(objectId) },
        { $set: clienteSemId }
    );
}

export async function deletarCliente(id) {
    const db = conexao.db("banco");
    const collection = db.collection("clientes");
    const objectId = ObjectId.createFromHexString(id);
    return collection.deleteOne({_id: new ObjectId(objectId)})    
}


export async function criarAgenda(novaAgenda) {
    const db = conexao.db("banco");
    const collection = db.collection("agendas");
    return collection.insertOne(novaAgenda);
}

export async function pegarAgenda() {
    const db = conexao.db("banco");
    const collection = db.collection("agendas");
    // retornando todos os elementos em formato json
    return collection.find().toArray();
    
}
export async function modificarAgenda(id, agenda) {
    const db = conexao.db("banco");
    const collection = db.collection("agendas");
    const objectId = ObjectId.createFromHexString(id);

    // Remove o _id do objeto para não dar problema
    const { _id, ...agendaSemId } = agenda;

    return collection.updateOne(
        { _id: new ObjectId(objectId) },
        { $set: agendaSemId }
    );
}

export async function deletarAgenda(id) {
    const db = conexao.db("banco");
    const collection = db.collection("agendas");
    const objectId = ObjectId.createFromHexString(id);
    return collection.deleteOne({_id: new ObjectId(objectId)})    
}

export async function criarDocumento(novoDocumento) {
    const db = conexao.db("banco");
    const collection = db.collection("documentos");
    return collection.insertOne(novoDocumento);
}
export async function pegarDocumentosPorCliente(clienteId) {
    const db = conexao.db("banco");
    const collection = db.collection("documentos");
    const documentos = await collection.find({ "dados.clienteId": clienteId }).toArray();
    return documentos;
}


export async function pegarDocumentosComReuniao() {
    const db = conexao.db("banco");
    const collection = db.collection("documentos");
    const comReuniao = await collection.find({
      "dados.reuniaoId": { $exists: true }
    }).toArray();
    return comReuniao;
}

export async function modificarDocumento(id, documento) {
    const db = conexao.db("banco");
    const collection = db.collection("documentos");
    const objectId = ObjectId.createFromHexString(id);

    const { _id, ...DocumentoSemId } = documento;

    return collection.updateOne(
        { _id: new ObjectId(objectId) },
        { $set: DocumentoSemId }
    );
}
    

export async function deletarDocumento(id) {
    const db = conexao.db("banco");
    const collection = db.collection("documentos");
    const objectId = ObjectId.createFromHexString(id);
    return collection.deleteOne({_id: new ObjectId(objectId)})    
}

export async function pegarDocumentoPorId(id) {
    const db = conexao.db("banco");
    const collection = db.collection("documentos");
    const objectId = ObjectId.createFromHexString(id); 
    return collection.findOne({ _id: new ObjectId(objectId) }); 
}   


export async function findDocumento(nome) {
    const db = conexao.db("banco");
    const collection = db.collection("documentos");
    return collection.findOne({ 
      nomeArquivo: nome 
    });
    
}   


export async function listarMongoFinanceiros(){
    const db = conexao.db("banco");
    const collection = db.collection("financeiro");
    // retornando todos os elementos em formato json
    return collection.find().toArray();
}

export async function  pegarMongoFinanceiro(id){
    const db = conexao.db("banco");
    const collection = db.collection("financeiro");
    return collection.findOne({_id: id})
}

export async function criarMongoFinanceiro(novoFinanceiro){
    const db = conexao.db("banco");
    const collection = db.collection("financeiro");
    return collection.insertOne(novoFinanceiro);
}

export async function modificarMongoFinanceiro(id, financeiro) {
    const db = conexao.db("banco");
    const collection = db.collection("financeiro");
    const { _id, ...financeiroSemId } = financeiro;

    return collection.updateOne(
        { _id: id },
        { $set: financeiroSemId }
    );
}

export async function deletarMongoFinanceiro(id){
    const db = conexao.db("banco");
    const collection = db.collection("financeiro");
    return collection.deleteOne({_id: id})
}    

export async function verificarVencidos(hoje){
    const db = conexao.db("banco");
    const collection = db.collection("financeiro");
    return await collection.updateMany(
        { data_vencimento: { $lt: hoje } },
        { $set: { status_pagamento: "Vencido" } }
    );
}    
