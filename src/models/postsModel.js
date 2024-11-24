import 'doteenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js"

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Estabelece a conexão com o banco de dados usando a string de conexão fornecida nas variáveis de ambiente

export async function getTodosPosts() { // Função assíncrona para obter todos os posts do banco de dados
    const db = conexao.db("imersao-instabytes"); // Acessa o banco de dados "imersao-instabytes"
    const colecao = db.collection("posts"); // Acessa a coleção "posts" dentro do banco de dados
    return colecao.find().toArray(); // Realiza uma consulta para encontrar todos os documentos na coleção e retorna os resultados como um array
}

export async function criarPost(novoPost) {
    // Conecta ao banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes"); 
  
    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts"); 
  
    // Insere um novo documento (post) na coleção e retorna uma promessa
    return colecao.insertOne(novoPost);
  }


  export async function atualizarPost(id, novoPost) {
    // Conecta ao banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes"); 
  
    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts"); 

    const objID = ObjectId.createFromHexString(id)
  
    // Insere um novo documento (post) na coleção e retorna uma promessa
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
  }  