const mongoose = require("mongoose");
const validator = require("validator");

const ContatoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  sobrenome: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  telefone: {
    type: String,
    default: "",
  },
  createdIn: { // Correção do nome do campo
    type: Date,
    default: Date.now,
  },
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body);
  }

  validate() {
    this.cleanUp();

    if (this.body.email && !validator.isEmail(this.body.email))
      this.errors.push("Invalid email");
    if (!this.body.nome) this.errors.push("Name is a required field");
    if (!this.body.email && !this.body.telefone)
      this.errors.push("At least one contact detail (email or phone) is required");
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone,
    };
  }
}

module.exports = Contato;
