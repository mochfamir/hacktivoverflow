var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
  hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
  },
  comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  },
  generateToken(id, email) {
    var token = jwt.sign({id, email}, process.env.JWT_SECRET);
    return token
  },
  decodeToken(token, callback) {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) callback(err)

      else callback(null, decoded)
    });
  }
}