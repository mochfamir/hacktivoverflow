const User = require('../models/user');
const Question = require('../models/question');
const Answer = require('../models/answer');
const {decodeToken} = require('../helper/helper');

module.exports = {
  userVerify(req, res, next) {
    decodeToken(req.headers.access_token, (err, data) => {
      if (err) res.status(400).json({msg: err.message})
      else {
        User
          .findById(data.id)
          .then(user => {
            if (user) {
              req.user = user
              next()
            } else {
              req.status(400).json({msg: 'User not found'})
            }
          })
          .catch(err => {
            req.status(500).json({msg: err.message})
          })
      }
    });
  },
  questionAuthorize(req, res, next) {
    Question
      .findById(req.params.id)
      .then(question => {
        if (String(question.user) === String(req.user._id)) {
          req.question = question
          next()
        } else {
          res.status(401).json({msg: 'Unauthorize'})
        }
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      });
  },
  answerAuthorize(req, res, next) {
    Answer
      .findById(req.params.answer)
      .then(answer => {
        if (String(answer.user) === String(req.user._id)) {
          req.answer = answer
          next()
        } else {
          res.status(401).json({msg: 'Unauthorize'})
        }
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      });
  },
  voteQuestionAuthorize(req, res, next) {
    Question
      .findOne({
        _id: req.params.question
      })
      .then(question => {
        next()
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  }
}