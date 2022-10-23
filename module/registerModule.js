const mongo = require("../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

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

///forgot password

// exports.forgot = async (req, res) => {
//   const { email } = req.body;
//   console.log(email);
//   try {
//     const existuser = await mongo.selectedDB
//       .collection("users")
//       .findOne({ email: req.body.email });
//     console.log(existuser);
//     if (!existuser) {
//       return res
//         .status(400)
//         .send({ msg: "you are not an exist user. Please signup" });
//     }
//     const secret = process.env.SECRET_KEY + existuser.password;
//     const payload = {
//       email: existuser.email,
//       id: existuser._id,
//     };

//     //User exist and now create a one time link valid for 15 minutes
//     const token = jwt.sign(payload, secret, { expiresIn: "15m" });
//     console.log(token);
//     const link = `https://localhost:3001/resetpassword/${existuser._id}/${token}`;
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "mgdhanesh98@gmail.com",
//         pass: "szqlearjiwuqybxk",
//       },
//     });
//     var mailOptions = {
//       from: "mgdhanesh98@gmail.com",
//       to: `${existuser.email}`,
//       subject: "Password reset link",
//       html: `We have received your request for reset password. Click this link to reset your password.<br>
//                   <a href = ${link}>Click Here</a><br>
//                   <p>This link is valid for 15 minutes from your request initiation for password recovery.</p>`,
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent:" + info.res);
//       }
//     });
//     res.send({ message: "Email sent successfully" });
//   } catch (error) {
//     res.send({ status: "error", data: error });
//   }
// };

///forgot password

// exports.forgot = async (req, res) => {
//   try {
//     const existuser = await mongo.selectedDB
//       .collection("users")
//       .findOne({ email: req.body.email });
//     if (existuser) {
//       var transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: "mgdhanesh98@gmail.com",
//           pass: "szqlearjiwuqybxk",
//         },
//       });
//       const token = crypto.randomBytes(16).toString("hex");
//       var mailOptions = {
//         from: "mgdhanesh98@gmail.com",
//         to: req.body.email,
//         subject: `Hi ${existuser.firstname}`,
//         text: `https://localhost:3001/resetpassword/${existuser._id}/${token}`,
//       };
//       transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log("Email sent: " + info.response);
//         }
//       });

//       return res
//         .status(200)
//         .send({ msg: "Link is send to your registered email id " });
//     } else {
//       res.status(400).send({ msg: "Not a valid email" });
//     }
//   } catch (error) {
//     return res.status(400).send(error);
//   }
// };
