// Importa as bibliotecas necessárias
import express from "express"; // Importa o Express para criar aplicações web
import multer from "multer"; // Importa o Multer para lidar com uploads de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Importa funções para gerenciar posts (listar, criar, fazer upload de imagens)
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000", 
  optionsSuccessStatus: 200
}

// Configura o armazenamento para o Multer (específico para Windows)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório onde os arquivos serão salvos (uploads/)
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo enviado pelo usuário
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage }); // Utiliza storage para melhor controle

// Configuração alternativa para Linux/Mac (comentada)
// const upload = multer({ dest: "./uploads" }); // Define o diretório de destino diretamente

// Define as rotas para a aplicação
const routes = (app) => {
  // Analisa dados JSON enviados nas requisições
  app.use(express.json());
  
  app.use(cors(corsOptions))

  // Rota para listar todos os posts (GET /posts)
  app.get("/posts", listarPosts);

  // Rota para criar um novo post (POST /posts)
  app.post("/posts", postarNovoPost);

  // Rota para fazer upload de imagens (POST /upload)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)

};

// Exporta a função de rotas para ser usada em outros módulos
export default routes;