const express = require("express"); //Carregar o express
const route = express.Router(); //Cria variavel temporaria

const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contatoController = require("./src/controllers/contatoController");

const { loginRequired } = require("./src/middlewares/middleware");
//Rotas
route.get("/", homeController.index);

//Rotas de login
route.get("/login", loginController.index);
route.post("/login/register", loginController.register);
route.post("/login/login", loginController.login);
route.get("/logout", loginController.logout);

//rotas de contator
route.get("/contato/index", loginRequired, contatoController.index);
route.post("/contato/register", loginRequired, contatoController.register);

module.exports = route;
