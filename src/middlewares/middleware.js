exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.user = req.session.user || null;
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
  if (err && err.code === 'EBADCSRFTOKEN') {
    return res.render('404');
  }
  next();
};

module.exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
