const express = require("express");
const {
    getAllTours, createOneTour, getOneTour, updateOneTour, deleteOneTour
} = require("../controllers/tourController")
const {AuthenticateUser} = require("../middlewares/authorizer");
const tourRouter = express.Router();

tourRouter.route("/")
    .get(AuthenticateUser, getAllTours)
    .post(AuthenticateUser, createOneTour);

tourRouter.route("/:id")
    .get(AuthenticateUser, getOneTour)
    .put(AuthenticateUser, updateOneTour)
    .delete(AuthenticateUser, deleteOneTour);

module.exports = tourRouter;