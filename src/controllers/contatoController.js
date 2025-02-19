const Contato = require("../models/contatoModel");

exports.index = (req, res) => {
  res.render("contato", {
    title: "Cadastrar Contato",
  });
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors); // Corrigir para exibir os erros corretamente
      req.session.save(() => res.redirect("/")); // Garantir que a sessão seja salva
      return;
    }
    req.flash("success", "Contato cadastrado com sucesso!");
    req.session.save(() => res.redirect("/contato/index")); // Corrigir a rota para redirecionar corretamente após o sucesso
    return;
  } catch (e) {
    console.error(e);
    return res.render("404");
  }
};
