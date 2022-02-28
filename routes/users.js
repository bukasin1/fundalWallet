var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController');
const CardController = require('../controllers/cardController')
const Auth = require('../middlewares/auth')

/* GET users listing. */
router.post('/signup', UserController.signUp);
router.get('/login', UserController.getLogin)
router.post('/login', UserController.localAuth, UserController.signIn);
router.get('/profile', Auth.authToken, UserController.getUserDetails)
router.post('/request-card', Auth.authToken, CardController.requestCard)
router.get('/*', function(req, res, next) {
  res.send('Invalid route');
});

module.exports = router;
