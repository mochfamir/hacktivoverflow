const router = require('express').Router();
const {create, getAll, update, remove, getOne} = require('../controllers/question');
const {userVerify, questionAuthorize} = require('../middleware/middleware');

router.post('/', userVerify, create);
router.get('/', userVerify, getAll);
router.get('/:id', userVerify, getOne);
router.put('/:id', userVerify, questionAuthorize, update);
router.delete('/:id', userVerify, questionAuthorize, remove);
router.put('/votes/:id', userVerify, update);

module.exports = router;