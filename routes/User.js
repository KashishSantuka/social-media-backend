const express = require("express");
const { getAllUser, signUpUser, loginUser } = require("../controllers/User");

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signUpUser);
router.post("/login", loginUser);

module.exports = router;
