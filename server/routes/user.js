const express = require('express');
const router = express.Router();

const User = require('../controllers/user')

router.get('/', function(req, res) {
  res.send('INI USERS')
});

router.get('/stared', User.showStar)

router.get('/repos', User.showRepo)

router.post('/stared/?', User.searchOrFilter)

router.post('/createRepo', User.createRepo)

router.get('/:username', User.findRepo)

router.delete('/unstar', User.unstar)

router.post('/login-fb', User.loginFb)

module.exports = router;
