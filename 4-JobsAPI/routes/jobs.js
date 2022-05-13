const express = require('express');

const jobRouter = express.Router();

const { getAllUserJobs, getOne, postOne, putOne, deleteOne } = require('../controllers/jobs');

jobRouter.route('/').get(getAllUserJobs).post(postOne);
jobRouter.route('/:id').get(getOne).put(putOne).delete(deleteOne);

module.exports = jobRouter;