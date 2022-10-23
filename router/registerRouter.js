const express = require("express");
const register = require("../module/registerModule");
const changepassword = require("../module/forgotModule");
const router = express.Router();

router.post("/signup", register.signup);
router.post("/signin", register.signin);
router.post("/forgot", changepassword.forgot);
router.get("/resetpassword/:id/:token", changepassword.resetpassword);
router.post(
  "/resetpasswordconfirm/:id/:token",
  changepassword.resetpasswordconfirm
);

module.exports = router;
