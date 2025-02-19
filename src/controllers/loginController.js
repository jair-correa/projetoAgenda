const Login = require("../models/LoginModel");

exports.index = (req, res) => {
  if (req.session.user) return res.render("login-logado");
  return res.render("login");
};

exports.register = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.redirect(req.get("Referrer") || "/"); // Redireciona corretamente
      });
      return;
    }

    req.flash("success", "Your user has been created successfully");
    req.session.save(() => {
      return res.redirect(req.get("Referrer") || "/"); // Redireciona corretamente
    });
  } catch (e) {
    console.error("Error during user registration:", e);
    req.flash(
      "errors",
      "An unexpected error occurred. Please try again later."
    );
    req.session.save(() => {
      return res.redirect(req.get("Referrer") || "/"); // Redireciona corretamente
    });
  }
};

exports.login = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.redirect(req.get("Referrer") || "/login"); // Redireciona corretamente
      });
      return;
    }

    req.flash("success", "You have successfully logged in");
    req.session.user = login.user;
    req.session.save(() => {
      return res.redirect(req.get("Referrer") || "/"); // Redireciona corretamente
    });
  } catch (e) {
    console.error("Error during user login:", e);
    req.flash(
      "errors",
      "An unexpected error occurred. Please try again later."
    );
    req.session.save(() => {
      return res.redirect(req.get("Referrer") || "/"); // Redireciona corretamente
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  return res.redirect(req.get("Referrer") || "/login"); // Redireciona corretamente
};
