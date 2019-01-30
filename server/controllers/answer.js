const Answer = require('../models/answer');

module.exports = {
  create(req, res) {
    Answer
      .create({
        title: req.body.title,
        description: req.body.description,
        user: req.user._id,
        question: req.params.question,
      })
      .then(answer => {
        res.status(201).json(answer)
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  },
  getAll(req, res) {
    Answer
      .find({
        question: req.params.question
      })
      .populate('user')
      .then(answers => {
        res.status(200).json(answers)
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  },
  update(req, res) {
    let data = req.body
    Answer
      .findByIdAndUpdate(req.params.answer, data, {new: true})
      .populate('user')
      .then(answer => {
        res.status(201).json(answer)
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  }
}