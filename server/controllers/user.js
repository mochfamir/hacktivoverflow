const User = require('../models/user');
const {comparePassword, generateToken} = require('../helper/helper');
var nodemailer = require('nodemailer');
var kue = require('kue')
 , queue = kue.createQueue();

 var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mochamad13amir@gmail.com',
    pass: 'Yellowsubmarine1397'
  }
});
 
queue.process('email', function(job, done){
  email(job.data, done);
});
 
function email(data, done) {
  setTimeout(() => {
    transporter
      .sendMail(data, function(error, info){
        console.log(data)
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    done();
  }, 2000)
}

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
              from: 'mochamad13amir@gmail.com',
              to: user.email,
              subject: 'Sending Email using Node.js, kue, redis, nodemailer',
              text: 'That was EZ!'
            })
            .save(function(err) {
              if (!err) console.log(kue.email, '===')
              else console.log(err, '+++')
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