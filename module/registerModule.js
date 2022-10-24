const mongo = require("../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const existuser = await mongo.selectedDB
      .collection("users")
      .findOne({ email: req.body.email });
    //if existUser
    if (existuser)
      return res.status(400).send({ msg: "you are an exist user" });

    //password & confirm password validation
    const isSameePassword = checkpassword(
      req.body.password,
      req.body.confirmpassword
    );
    if (!isSameePassword) {
      return res.status(400).send({ msg: "password doesnot match" });
    } else delete req.body.confirmpassword;
    //password hash
    const randomString = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, randomString);
    //save in DB
    const insertedRseponse = mongo.selectedDB
      .collection("users")
      .insertOne({ ...req.body });
    res.send(insertedRseponse);
  } catch (err) {
    console.log(err, "signupmodule");
    return res.status(400).send(err);
  }
};
const checkpassword = (password, confirmpassword) => {
  return password !== confirmpassword ? false : true;
};
///\\\\\\

//signin
exports.signin = async (req, res, next) => {
  //email validation
  const existuser = await mongo.selectedDB
    .collection("users")
    .findOne({ email: req.body.email });
  // console.log(existuser);
  if (!existuser) {
    return res
      .status(400)
      .send({ msg: "you are not an exist user. Please signup" });
  }
  //password vaild or not

  const isSamePassword = await bcrypt.compare(
    req.body.password,
    existuser.password
  );
  if (!isSamePassword)
    return res.status(400).send({ msg: "password doesn't match" });

  //token creation
  const token = jwt.sign(existuser, process.env.SECERT_KEY, {
    expiresIn: "1hr",
  });
  res.send(token);
};
