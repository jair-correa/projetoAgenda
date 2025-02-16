const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const LoginModel = mongoose.model("Login", LoginSchema);

//module.exports= HomeModel;

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }
  async register() {
    this.valida();
    if (this.errors.length > 0) return;
    try {
      const salt = bcryptjs.genSalt();
      this.body.password = bcryptjs.hashSync(this.body.password,salt);
      this.user = await LoginModel.create(this.body);
    } catch (e) {
      console.log(e);
    }
  }
  valida() {
    this.cleanUp();
    //Validação
    //O e-mail precisa ser valido
    if (!validator.isEmail(this.body.email)) {
      this.errors.push("Invalid email");
    }
    //A senha precisa ter mais de 8 caracteres
    if (this.body.password.length < 8) {
      this.errors.push("Password must be at least 8 characters long");
    }
    //Se não há erros, tentar cadastrar o novo usuário
    if (this.errors.length > 0) return;
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Login;
