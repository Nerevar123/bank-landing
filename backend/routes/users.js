const router = require('express').Router();
const {
  getUserInfo, patchUserInfo, putAccounts, putLoan,
} = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', patchUserInfo);
router.put('/me', putAccounts);
router.patch('/me/loan', putLoan);

module.exports = router;
