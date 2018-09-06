const jwt = require('jsonwebtoken')

module.exports = {
  getJwt: (obj) => {
    return new Promise((resolve, reject) => {
      jwt.sign(obj, process.env.JWT_SECRET, (err, token) => {
          if (err) {
            console.log(err);
            reject(err)
          } else {
            resolve(token)
          }
      })
    })
  }
}