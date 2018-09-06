module.exports = {
  isLogin: (req, res, next) => {
    if (!req.session.user) {
      res.status(403).json({error: 'Please login first!'})
    } else {
      next()
    }
  }
}