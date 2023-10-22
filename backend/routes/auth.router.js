const express = require("express");
const { check } = require("express-validator");


const { registerUser } = require("../controllers/auth.controller");

const auth = express.Router();

const authBaseUrl = "/auth/user";

auth.post(
    authBaseUrl + "/register", 
[
    check(firstname, "Firstname is required").notEmpty(),
    check(lastname, "Lastname is required").notEmpty(),
    check(email, "Email is required").notEmpty(),

], registerUser
);


module.exports = { auth }