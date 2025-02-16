require("dotenv").config(); // Carregar variáveis de ambiente
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const flash = require("connect-flash");
const path = require("path");
const helmet = require("helmet");
const csrf = require("csurf");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // Corrigido
const { middlewareGlobal, checkCSRFError, csrfMiddleware } = require("./src/middlewares/middleware");
const routes = require("./routes");

// 🔹 Conectar ao MongoDB
mongoose
  .connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.emit("OK"); // Emitir sinal para iniciar o servidor
  })
  .catch(e => console.log("Erro ao conectar ao MongoDB:", e));

// 🔹 Middlewares de segurança
app.use(helmet());

// 🔹 Configuração da sessão
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Segredo da sessão
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.CONNECTIONSTRING, // Passa a URL de conexão corretamente
      collectionName: "sessions", // Nome da coleção no MongoDB
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      httpOnly: true,
    },
  })
);

// 🔹 Middlewares do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

// 🔹 Middleware de mensagens flash
app.use(flash());

// 🔹 Configuração do motor de visualização
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

// 🔹 Middleware de proteção CSRF
app.use(csrf());
app.use(checkCSRFError);
app.use(csrfMiddleware);

// 🔹 Middleware global e rotas
app.use(middlewareGlobal);
app.use(routes);

// 🔹 Iniciar o servidor após a conexão com o banco
app.on("OK", () => {
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000 --> http://localhost:3000");
  });
});
