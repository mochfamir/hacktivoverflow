const Question = require('../models/question');

module.exports = {
  create(req, res) {
    Question
      .create({
        title: req.body.title,
        description: req.body.description,
        upvote: req.body.downvote,
        downvote: req.body.downvote,
        tag: req.body.tag,
        user: req.user._id
      })
      .then(question => {
        return Question.findOne({
          _id: question._id
        })
        .populate('user')
      })
      .then(question => {
        res.status(201).json(question)
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  },
  getAll(req, res) {
    let option = {}
    if (req.option) option = req.option

    Question
      .find(option)
      .populate('user')
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  },
  getOne(req, res) {
    Question
      .findById(req.params.id)
      .populate('user')
      .then(question => {
        res.status(200).json(question)
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  },
  update(req, res) {
    let data = req.body
    Question
      .findByIdAndUpdate(req.params.id, data, {new: true})
      .populate('user')
      .then(question => {
        res.status(201).json(question)
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  },
  remove(req, res) {
    Question
      .findByIdAndRemove(req.params.id)
      .then(question => {
        res.status(200).json(req.params.id)
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  }
}