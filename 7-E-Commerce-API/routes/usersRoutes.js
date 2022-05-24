const express = require("express");
const {authenticateUser, authorizePermissions} = require("../middlewares/authorizer")
const router = express.Router();
const {
    getAllUsers, getOneUser, getCurrentUser, updateOneUser, updateUserPassword
} = require("../controllers/usersController");

router.route("/").get(authenticateUser, authorizePermissions("admin", "owner"), getAllUsers);
router.route("/show-me").get(authenticateUser, getCurrentUser);
router.route("/:id").get(authenticateUser, authorizePermissions("admin"), getOneUser);
router.route("/update-user").patch(authenticateUser, updateOneUser);
router.route("/update-password").patch(authenticateUser, updateUserPassword);


module.exports = router;