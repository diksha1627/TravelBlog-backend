var express = require('express');
const { getAllUsers, login, signup } = require("../controllers/user-controller.js");
const router = express.Router();

router.get("/",getAllUsers);
router.post("/signup",signup);
router.post("/login",login)
module.exports=router;