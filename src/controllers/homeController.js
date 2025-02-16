exports.homePage = (req, res) => {
  //console.log(req.flash('success','yes'), req.flash('error','Ugh'),req.flash('info','XX'), req.flash;
  if (!req.session) {
    req.session = {}; // Garantir que a sessão seja inicializada
  }
  (req.session.user = { nome: "Jair", login: true }), res.render("index", { // Agora deve funcionar corretamente
    title: "homePage<span style='color:red;'> Titulo </span> da pagina",
    numberPages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  });
  return;
};

exports.fixPost = (req, res) => {
  res.send(req.body);
  return;
};
