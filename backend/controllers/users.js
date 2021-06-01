const jwt = require('jsonwebtoken');
const yn = require('yn');
const User = require('../models/user');
const { cryptHash } = require('../utils/crypt');
const NotFoundError = require('../errors/not-found-error');
const { JWT_SECRET, COOKIES_SECURE, COOKIES_SAMESITE } = require('../config');
const {
  notFoundUserErrorMessage, registrationOkMessage, logoutOkMessage,
} = require('../utils/constants');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user)
    .orFail(new NotFoundError(notFoundUserErrorMessage))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.patchUserInfo = (req, res, next) => {
  const {
    email, id, name, surname, tel, birthDate, companyName, companyNumber,
  } = req.body;

  User.findByIdAndUpdate(
    req.user,
    {
      email, id, name, surname, tel, birthDate, companyName, companyNumber,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError(notFoundUserErrorMessage))
    .then((user) => {
      res.send({
        name: user.name,
        surname: user.surname,
        id: user.id,
        birthDate: user.birthDate,
        tel: user.tel,
        email: user.email,
        companyName: user.companyName,
        companyNumber: user.companyNumber,
        accounts: user.accounts,
      });
    })
    .catch(next);
};

module.exports.putAccounts = (req, res, next) => {
  const data = req.body;

  User.findByIdAndUpdate(
    req.user,
    {
      accounts: data,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError(notFoundUserErrorMessage))
    .then((user) => {
      res.send({
        name: user.name,
        surname: user.surname,
        id: user.id,
        birthDate: user.birthDate,
        tel: user.tel,
        email: user.email,
        companyName: user.companyName,
        companyNumber: user.companyNumber,
        accounts: user.accounts,
        loan: user.loan,
      });
    })
    .catch(next);
};

module.exports.putLoan = (req, res, next) => {
  const { amount, term } = req.body;

  User.findByIdAndUpdate(
    req.user,
    {
      loan: { amount, term },
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError(notFoundUserErrorMessage))
    .then((user) => {
      res.send({
        name: user.name,
        surname: user.surname,
        id: user.id,
        birthDate: user.birthDate,
        tel: user.tel,
        email: user.email,
        companyName: user.companyName,
        companyNumber: user.companyNumber,
        accounts: user.accounts,
        loan: user.loan,
      });
    })
    .catch(next);
};

module.exports.register = (req, res, next) => {
  const {
    email, password, id, name, surname, tel, birthDate, companyName, companyNumber,
  } = req.body;

  User.init()
    .then(() => {
      cryptHash(password)
        .then((hash) => User.create({
          email, id, name, surname, tel, birthDate, companyName, companyNumber, password: hash,
        }))
        .then(() => res.status(201).send({ message: registrationOkMessage }))
        .catch(next);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        sameSite: COOKIES_SAMESITE,
        secure: yn(COOKIES_SECURE),
        httpOnly: yn(COOKIES_SECURE),
      });
      res.send({
        name: user.name,
        surname: user.surname,
        id: user.id,
        birthDate: user.birthDate,
        tel: user.tel,
        email: user.email,
        companyName: user.companyName,
        companyNumber: user.companyNumber,
        accounts: user.accounts,
        loan: user.loan,
      });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      sameSite: COOKIES_SAMESITE,
      secure: yn(COOKIES_SECURE),
      httpOnly: yn(COOKIES_SECURE),
    });
    res.send({ message: logoutOkMessage });
  } catch (err) {
    next(err);
  }
};
