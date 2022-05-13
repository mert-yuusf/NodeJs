const express = require('express');
const { allProfiles } = require('../controllers/profiles')
const profileRouter = express.Router();

profileRouter.route('/').get(allProfiles);

module.exports = profileRouter;