const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

const router = express.Router();

// GET /users
router.get("/", (req, res) => {
  User.find()
    // .sort()
    .then((users) => res.json(users));
});

module.exports = router;
