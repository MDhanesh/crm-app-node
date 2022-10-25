const express = require("express");
const router = express.Router();
const contactModule = require("../module/contactmodule");

router.get("/get", contactModule.getContact);

router.post("/create", contactModule.createContact);

router.put("/update/:id", contactModule.updateContact);

router.delete("/delete/:id", contactModule.deleteContact);

module.exports = router;
