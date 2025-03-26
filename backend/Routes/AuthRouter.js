const router = require('express').Router();  // Notice the parentheses
const { singup,login } = require('../Controllers/AuthController');
const { signupvalidation, loginvalidation } = require('../Middleware/AuthValidation');

// router.post('/login', (req, res) => {
//     res.send('Login API');
// });
// router.post('/login', (req, res) => {


router.post('/login', loginvalidation, login);
router.post('/signup', signupvalidation, singup);

module.exports = router;
