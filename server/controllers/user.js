const User = require('../models/user');
const {comparePassword, generateToken} = require('../helper/helper');
var nodemailer = require('nodemailer');
var kue = require('kue')
 , queue = kue.createQueue();
 
queue.process('email', function(job, done){
  console.log(job.data)
  email('hehe', done);
});
 
function email(address, done) {
  setTimeout(() => {
    console.log(address)
    done();
  }, 5000)
}

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'youremail@gmail.com',
//     pass: 'yourpassword'
//   }
// });

// var mailOptions = {
//   from: 'youremail@gmail.com',
//   to: 'myfriend@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };


// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

module.exports = {
  register(req, res) {
    User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  },
  login(req, res) {
    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if (comparePassword(req.body.password, user.password)) {
          let kue = queue
            .create('email', {
              email: 'tes'
            })
            .save(function(err) {
              if (!err) console.log(kue.email)
              else console.log(err)
            })
          res.status(200).json({
            access_token: generateToken(user._id, user.email),
            user: user
          })
        } else {
          res.status(400).json({msg: 'Wrong email/password'})
        }
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  }
}