exports.index = (req, res) => {
  if (!req.session) {
    req.session = {}; // Garantir que a sessão seja inicializada
  }
  req.session.user = { nome: "Jair", login: true };
  res.render("index"); // Renderize o template EJS "index"
  return;
};

