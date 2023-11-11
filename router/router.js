const express = require("express");
const { sendMessage } = require("../controller/controller");

const router = express.Router();

router.post("/message", sendMessage)

module.exports = { router }
