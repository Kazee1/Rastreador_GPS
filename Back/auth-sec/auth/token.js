import "dotenv/config"
import jwt from 'jsonwebtoken'


export async function CriarToken() {
    try{
        
        const token = jwt.sign({ id: 'adm' }, process.env.TOKEN, { expiresIn: '2h' });
        const {exp} = jwt.decode(token);
        return {token,exp};
   
    }catch(err){
        console.error('Erro ao criar token',err);
        throw err;
    }
}

export async function VerificarToken(req,res,next){
   try{
        const header = req.headers['authorization'];
        const token = header && header.split(' ')[1];
        if(!token) return res.status(401).send('Erro na autentificação'); //token vazio


        try{
            
            const user =jwt.verify(token,process.env.TOKEN);
            req.user = user;
            next();
        }catch(err){
            return res.status(403).send('Acesso Negado'); //token com assinatura invalida
        }
    
    }catch(err){
        console.error('Erro Validação Token');
        return res.status(500).send({erro:'Erro Interno do Servidor'});
    }

}