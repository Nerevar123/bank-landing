const mongoose = require('mongoose');
const validator = require('validator');
const { cryptCompare } = require('../utils/crypt');
const UnauthorizedError = require('../errors/not-authorized-error');
const { authorizedErrorMessage } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email address already registered'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Email validation failed',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [4, 'Minimum password length is 6 characters'],
    select: false,
    validate: {
      validator: (v) => /^\S+$/.test(v),
      message: 'Invalid character in password',
    },
  },
  id: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 12,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  surname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  tel: {
    type: String,
  },
  birthDate: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  companyNumber: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  accounts: {
    type: Object,
  },
  loan: [{
    amount: {
      type: String,
      required: true,
    },
    term: {
      type: String,
      required: true,
    },
  }],
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError(authorizedErrorMessage))
    .then((user) => cryptCompare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(authorizedErrorMessage);
        }

        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
