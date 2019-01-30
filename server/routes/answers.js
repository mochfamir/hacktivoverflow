const router = require('express').Router();
const {create, update, getAll} = require('../controllers/answer');
const {userVerify, answerAuthorize, voteQuestionAuthorize} = require('../middleware/middleware');

router.post('/:question', userVerify, create);
router.get('/:question', userVerify, getAll);
router.put('/:question/:answer', userVerify, answerAuthorize, update);
router.put('/votes/:question/:answer', userVerify, voteQuestionAuthorize, update);
// router.put('/:question/:answer', (req, res) => {
//   console.log(req.body)
//   res.status(200).json(req.body)
// });

module.exports = router;