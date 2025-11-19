import bcrypt from 'bcrypt'
import "dotenv/config"

//Hash da Senha
export async function encriptar(password){
    const passwordCrypt = await bcrypt.hash(password,10);
    return passwordCrypt;
}

//Verificar Senha
export async function validarEnc(Reqpassword,AdmPass){
    const passwordValidado = await bcrypt.compare(Reqpassword,AdmPass);
    return passwordValidado;
}