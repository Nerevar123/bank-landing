const router = require('express').Router();
const userRouter = require('./users');
const auth = require('../middlewares/auth');
const { register, login, logout } = require('../controllers/users');
const { notFoundErrorMessage } = require('../utils/constants');

router.post('/signin', login);
router.post('/signup', register);

router.use(auth);

router.use('/users', userRouter);

router.use('/logout', logout);

router.use('*', (req, res) => {
  res.status(404).send({ message: notFoundErrorMessage });
});

module.exports = router;
