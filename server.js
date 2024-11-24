import express from "express"; 
import routes from "./src/routes/postsRoutes.js"

const app = express(); // Cria uma instância da aplicação Express
app.use(express.static("uploads"))
routes(app)

app.listen(3000, () => { // Inicia o servidor na porta 3000
  console.log("Servidor escutando..."); // Imprime uma mensagem no console indicando que o servidor está ouvindo por requisições
});
