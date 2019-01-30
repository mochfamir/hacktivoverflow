const {Schema, model} = require('mongoose');

const answerSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  upvote: [{type: Schema.Types.ObjectId, ref: 'User'}],
  downvote: [{type: Schema.Types.ObjectId, ref: 'User'}],
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  question: {type: Schema.Types.ObjectId, ref: 'Question'},
  accepted: {
    type: Boolean,
    default: false
  }
})

const Answer = model('Answer', answerSchema);

module.exports = Answer