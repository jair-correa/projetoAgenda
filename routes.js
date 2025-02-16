const express = require("express");//Carregar o express
const route = express.Router();//Cria variavel temporaria
const homeController = require("./src/controllers/homeController");
const myselfController = require("./src/controllers/myselfController");
const contatoController = require("./src/controllers/contatoController");

//Rotas
route.get("/", homeController.homePage);
route.post("/", homeController.fixPost);
route.get("/myself/", myselfController.homePage);
route.get("/contato", contatoController.homePage);

module.exports = route;
