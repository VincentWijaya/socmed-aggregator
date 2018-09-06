module.exports = {
  isLogin: (next) => {
    if (localStorage.getItem('token')) {
      next()
    } else {
      res.status(403).json({error: 'Please login first!'})
    }
  }
}