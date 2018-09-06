const request = require('request')
const accessToken = 'token ' + process.env.TOKEN
const axios = require('axios');
const User = require('../models/User')
const jwt = require('../helpers/jwtGenerator')

class Controller {
  
  static api(link, cb) {
    let options = {
      url: link,
      headers: {
        'User-Agent': 'request',
        'Authorization': accessToken
      }
    }
  
    return request.get(options, cb)
  }  
  
  static showRepo(req, res) {
    Controller.api('https://api.github.com/user/repos', (err, response, body) => {
      if (err || response.statusCode != 200) {
        res.status(500).json({error: err.message, message: JSON.parse(body)})
      } else {
        res.status(200).json({data: JSON.parse(body)})
      }
    })
  }
  
  static showStar(req, res) {    
    Controller.api('https://api.github.com/user/starred', (err, response, body) => {
      if (err || response.statusCode != 200) {
        res.status(500).json({error: err.message, message: JSON.parse(body)})
      } else {
        res.status(200).json({data: JSON.parse(body)})
      }
    })
  }
  
  static searchOrFilter(req, res) {
    if (req.query['name']) {
      Controller.api('https://api.github.com/user/starred', (err, response, body) => {
        if (err || response.statusCode != 200) {
          res.status(500).json({error: err.message, message: JSON.parse(body)})
        } else {
          let hasil = []
          let repos = JSON.parse(body)
          
          repos.forEach(repo => {
            if (repo.name.indexOf(req.query.name) >= 0) {
              hasil.push(repo)
            }
          })
          
          res.status(200).json(hasil)
        }
      })
    } else if (req.query['language']) {
      Controller.api('https://api.github.com/user/starred', (err, response, body) => {
          if (err || response.statusCode != 200) {
            res.status(500).json({error: err.message, message: JSON.parse(body)})
          } else {
            let hasil = []
            let repos = JSON.parse(body)
            
            repos.forEach(repo => {
              if (repo.language === req.query.language) {
                hasil.push(repo)
              }
            })
            
            res.status(200).json(hasil)
          }
        })
    } else {
      res.status(400).json({error: 'Query not found!'})
    }
  }
  
  static createRepo(req, res) {
    if (req.body.name || req.body.description) {
      let options = {
        url: 'https://api.github.com/user/repos',
        headers: {
          'User-Agent': 'request',
          'Authorization': accessToken
        }
      }
      
      options.body = JSON.stringify({
              name: req.body.name,
              description: req.body.description
      })
      
      request.post(options, (err, response, body) => {
        if (err || response.statusCode != 201) {
          res.status(500).json({error: err.message, message: JSON.parse(body)})
        } else {
          res.status(200).json({data: JSON.parse(body)})
        }
      })
    } else {
      res.status(400).json({error: 'Please provide name and description in body!'})
    }  
  }
  
  static findRepo(req, res) {
    Controller.api(`https://api.github.com/users/${req.params.username}/repos`, (err, response, body) => {
      if (err || response.statusCode != 200) {
        res.status(500).json({error: err, message: JSON.parse(body)})
      } else {
        res.status(200).json({data: JSON.parse(body)})
      }
    })
  }
  
  static unstar(req, res) {
    let options = {
      url: `https://api.github.com/user/starred/${req.body.username}/${req.body.repo}`,
      headers: {
        'User-Agent': 'request',
        'Authorization': accessToken
      }
    }
    
    request.delete(options, (err, response, body) => {
      if (err) {
        res.status(500).json({error: err.message})
      } else {
        res.status(200).json({message: `Repo ${req.body.repo} successfully unstar!`})
      }
    })    
  }
  
  static loginFb(req, res) {
    let url = `https://graph.facebook.com/me?fields=id,name,email&access_token=${req.body.token_fb}`

    axios({
      method: 'get',
      url: url
    })
      .then(response => {
        // console.log(response.data)
        User.findOne({email: response.data.email}, (err, data) => {
          if (data) {
            let obj = {
              facebook_id: Number(data.facebook_id),
              name: data.name,
              email: data.email,
              role: data.role
            }
            
            jwt.getJwt(obj)
              .then(token => {
                res.status(200).json({token: token})
              })
              .catch(err => {
                res.status(500).json(err)
              })
          } else {
            let newUser = new User({
              facebook_id : String(response.data.id),
              name : response.data.name,
              email: response.data.email
            })

            newUser.save()
              .then(user => {
                let obj = {
                  facebook_id: Number(user.facebook_id),
                  name: user.name,
                  email: user.email,
                  role: user.role
                }
                
                jwt.getJwt(obj)
                  .then(token => {
                    res.status(200).json({token: token})
                  })
                  .catch(err => {
                    res.status(500).json(err)
                  })
              })
              .catch(err => {
                console.log(err)
                res.status(500).json({error: err})
              })
          }
        })
      })
      .catch(err => {
        res.status(500).json({error: err.response.data.error.message})
      })
  }
  
}

module.exports = Controller