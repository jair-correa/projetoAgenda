const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

// Define a função de fallback
bcryptjs.setRandomFallback((len) => {
  const buffer = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    buffer[i] = Math.floor(Math.random() * 256);
  }
  return buffer;
});

const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Garante a unicidade do email no nível do schema
    validate: {
      validator: validator.isEmail,
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"], // Ajuste para 8 caracteres
  },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.cleanUp();
    this.validate();

    if (this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });

    if (!this.user || !bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Invalid email or password");
      this.user = null;
      return;
    }
  }

  async register() {
    this.cleanUp();
    this.validate();
    if (this.errors.length > 0) return;

    await this.userExists(); // Verificar se o email já existe
    if (this.errors.length > 0) return;
    
    try {
      const salt = bcryptjs.genSaltSync();
      this.body.password = bcryptjs.hashSync(this.body.password, salt);
      this.user = await LoginModel.create(this.body);
    } catch (e) {
      console.error("Error during registration:", e);
      this.errors.push("Error during registration. Please try again later.");
    }
  }

  async userExists() {
    const user = await LoginModel.findOne({ email: this.body.email });
    if (user) {
      this.errors.push("Email already in use");
    }
  }

  validate() {
    if (!validator.isEmail(this.body.email)) {
      this.errors.push("Invalid email");
    }
    if (this.body.password.length < 8) {
      this.errors.push("Password must be at least 8 characters long");
    }
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
