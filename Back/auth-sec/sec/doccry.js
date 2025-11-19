import crypto from "crypto";
import path from "path";
import {writeFile,readFile} from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


// doccry.js - Funções atualizadas
export async function decifrarArquivo(arqEncri, key) {
  try {
    const iv = arqEncri.subarray(0, 16);
    const conteudo = arqEncri.subarray(16);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    
    const decifrado = Buffer.concat([decipher.update(conteudo), decipher.final()]);
    return decifrado;
  } catch (err) {
    console.error('Erro na decifração:', err);
    throw err;
  }
}

export async function encriptarArquivo(arquivo, key) {
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    
    // Encripta o buffer original diretamente
    const encrypted = Buffer.concat([
      cipher.update(arquivo.buffer),
      cipher.final()
    ]);

    // Combina IV + conteúdo encriptado
    const arquivoCompleto = Buffer.concat([iv, encrypted]);

    // Envia para o Cloudinary como buffer raw
    const nomeArquivo = encriptarTexto(`${Date.now()}-${arquivo.originalname}`, key);
    
    const resultado = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'documentos_encriptados',
          public_id: nomeArquivo
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      
      stream.end(arquivoCompleto);
    });

    return {
      nomeArquivo: nomeArquivo,
      url: resultado.secure_url
    };
  } catch (err) {
    console.error('Erro na encriptação:', err);
    throw err;
  }
}


export function encriptarTexto(dado,key){
    try{
        //Pegar o texto para encriptar
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        const enc= Buffer.concat([cipher.update(dado,'utf8'), cipher.final()]);
        const textoEnc =Buffer.concat([iv,enc]).toString('base64url'); 
        return textoEnc;

    }catch(err){
        throw err
}
}


export function decifrarTexto(dado,key){

    try{
        
        const texto =  Buffer.from(dado,'base64url');
        
        //Pegar o iv salvo para decifrar
        const iv =texto.subarray(0,16);
        const textoEnc=texto.subarray(16);
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        const textoDec= Buffer.concat([decipher.update(textoEnc,'utf8'), decipher.final()]);
        return textoDec.toString('utf-8');

    }catch(err){
        throw err
    }

}