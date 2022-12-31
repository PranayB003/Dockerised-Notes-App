const express = require("express");
const authController = require("../controllers/authController");

const authRoutes = express.Router();

authRoutes.use("/users", authController.handleMissingCredentials);
authRoutes.route("/users/login").post(authController.login);
authRoutes.route("/users/register").post(authController.registerUser);
authRoutes.use("/", authController.authoriseUser);

module.exports = authRoutes;
