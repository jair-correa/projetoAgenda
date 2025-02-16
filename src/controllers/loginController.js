const Login = require("../models/LoginModel");

exports.index = (req, res) => {
  res.render("login");
};

exports.register = async (req, res) => {
  try{
  const login = new Login(req.body);
  await login.register();

  if (login.errors.length > 0) {
    req.flash("errors", login.errors);
    req.session.save(function () {
          return res.redirect("back");
       //return res.redirect(req.get("Referrer") || "/"); // Redireciona corretamente
      });
      return;
    }
    req.flash("success", 'Your user has created successfully');
    req.session.save(function () {
          return res.redirect("back");
       //return res.redirect(req.get("Referrer") || "/"); // Redireciona corretamente
      });
    }catch(e){
      console.log(e);
      return res.render('404')
  }
};
