exports.middlewareGlobal = (req, res, next) => {
  res.locals.localVariable = "Este é o valor da variave local";
  next();
};
exports.outroMiddleware = (req, res, next) => {
  next();
};

exports.checkCSRFError = (err, req, res, next) => {
  if (err && err.code === "EBADCSRFTOKEN") {
    return res.render("404");
  }
}; 

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
