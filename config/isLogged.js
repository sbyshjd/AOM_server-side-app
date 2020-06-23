function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(403).json({message:'need authentication'})
    }
  }

  module.exports = ensureAuthenticated;