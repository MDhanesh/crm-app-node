const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongo = require("./connect");
const registerRouter = require("./router/registerRouter");
const servicesRouter = require("./router/servicesRouter");
const contactRouter = require("./router/contactRouter");
//.env
dotenv.config();
mongo.connect();

///
const app = express();
app.use(cors());
app.use(express.json());

///register
app.use("/register", registerRouter);
app.use("/services", servicesRouter);
app.use("/contact", contactRouter);

//listening port
app.listen(process.env.PORT);
