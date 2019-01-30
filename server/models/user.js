const {Schema, model} = require('mongoose');
const {hashPassword} = require('../helper/helper');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      isAsync: true,
      validator: function(value, cb) {
        User.findOne({
          email: value
        }, function(err, result) {
          cb(!result, 'Email already registered!')
        })
      }
    }
  },
  password: {
    type: String,
    required: true
  },
  watchTag: [String]
})

userSchema.pre('save', function(next) {
  let hash = hashPassword(this.password)
  this.password = hash
  next()
})

const User = model('User', userSchema);

module.exports = User