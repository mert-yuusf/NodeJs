const express = require('express');
const {
    getAll,
    postOne,
    getOne,
    deleteOne,
    putOne } = require('../controllers/products');
const router = express.Router();

router.route('/products').get(getAll).post(postOne);
router.route('/products/:id').get(getOne).delete(deleteOne).put(putOne);

module.exports = router;