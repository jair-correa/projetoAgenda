exports.index = (req, res) => {
  //console.log(req.flash('success','yes'), req.flash('error','Ugh'),req.flash('info','XX'), req.flash;
  if (!req.session) {
    req.session = {}; // Garantir que a sessão seja inicializada
  }
  (req.session.user = { nome: "Jair", login: true }), res.render("index", { // Agora deve funcionar corretamente
   });
  return;
};

