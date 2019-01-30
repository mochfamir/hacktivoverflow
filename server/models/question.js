const {Schema, model} = require('mongoose');

const questionSchema = new Schema({
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
  tag: [String],
  user: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Question = model('Question', questionSchema);

module.exports = Question;