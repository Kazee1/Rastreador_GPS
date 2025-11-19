import { MongoClient } from 'mongodb';

export default async function ConectarBanco(stringConexao){
    let mongoClient;

    try{
        mongoClient = new MongoClient(stringConexao);
        console.log("conectando ao cluster do banco mongodb");
        await mongoClient.connect();
        console.log("conectado ao banco");
        return mongoClient;
    }
    catch(erro){
        console.error("erro ao conectar no banco");
        process.exit();
    }

}

