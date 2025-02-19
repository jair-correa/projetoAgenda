exports.middlewareGlobal = (req, res, next) => {
  //  res.locals.errors = req.flash("errors");
  //  res.locals.success = req.flash("success");
  res.locals.user = req.session.user;
  next();
};
// src/middlewares/middleware.js
module.exports.middlewareGlobal = (req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
};

// Outros middlewares
module.exports.checkCSRFError = (err, req, res, next) => {
  if (err && err.code === "EBADCSRFTOKEN") {
    return res.render("404");
  }
  next();
};

module.exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

module.exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    //quer dizer que o usuario nao esta logado
    req.flash("errors", "Você precisa fazer login.");
    req.session.save(() => res.redirect("/")); //garante que a seção seja salva
    return;
  }
  next();
};
