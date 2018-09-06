const express = require('express');
const router = express.Router();

const {isLogin} = require('../middleware/isLogin') 

const User = require('../controllers/user')

router.get('/', function(req, res) {
  res.send('INI USERS')
});

router.get('/stared', User.showStar)

router.get('/repos', User.showRepo)

router.post('/stared/?', User.searchOrFilter)

router.post('/createRepo', isLogin, User.createRepo)

router.get('/:username', User.findRepo)

router.delete('/unstar', isLogin, User.unstar)

router.post('/login-fb', isLogin, User.loginFb)

module.exports = router;
