import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiServices.js";

export async function listarPosts(req, res) {
    // Chama a função para buscar os posts
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    // Extrai os dados do novo post do corpo da requisição
    const novoPost = req.body;
  
    try {
      // Chama a função para criar um novo post no banco de dados
      const postCriado = await criarPost(novoPost);
  
      // Retorna uma resposta HTTP com status 200 (sucesso) e o post criado
      res.status(200).json(postCriado);
    } catch (erro) {
      // Imprime o erro no console para depuração
      console.error(erro.message);
  
      // Retorna uma resposta HTTP com status 500 (erro interno do servidor)
      res.status(500).json({"Erro":"Falha na requisição"});
    }
  }

  export async function uploadImagem(req, res) {
    // Cria um objeto com os dados básicos do novo post (apenas a imagem por enquanto)
    const novoPost = {
      descricao: "",
      imgUrl: req.file.originalname,
      alt: ""
    };
  
    try {
      // Cria um novo post no banco de dados
      const postCriado = await criarPost(novoPost);
  
      // Constrói o novo nome da imagem com o ID do post
      const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
  
      // Renomeia o arquivo da imagem para o novo nome
      fs.renameSync(req.file.path, imagemAtualizada);
  
      // Retorna uma resposta HTTP com status 200 (sucesso) e o post criado
      res.status(200).json(postCriado);
    } catch (erro) {
      // Imprime o erro no console para depuração
      console.error(erro.message);
  
      // Retorna uma resposta HTTP com status 500 (erro interno do servidor)
      res.status(500).json({"Erro":"Falha na requisição"});
    }
  }

  export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}