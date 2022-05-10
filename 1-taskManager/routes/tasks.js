const express = require('express');
const { getAll, postOne, getOne, patchOne, putOne, deleteOne } = require('../controllers/tasks');
const router = express.Router();

router.route('/').get(getAll).post(postOne);
router.route('/:id').get(getOne).patch(patchOne).put(putOne).delete(deleteOne);

module.exports = router;