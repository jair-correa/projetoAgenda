const express = require("express"); //Carregar o express
const route = express.Router(); //Cria variavel temporaria
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
//Rotas

route.get("/", homeController.index);
//Rotas de login
route.get("/login",loginController.index);
route.post("/login/register",loginController.register);
route.post("/login/login",loginController.login);

module.exports = route;
