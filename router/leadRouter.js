const express = require("express");
const router = express.Router();
const leadModule = require("../module/leadModule");

router.get("/get", leadModule.getLead);

router.post("/create", leadModule.createLead);

router.put("/update/:id", leadModule.updateLead);

router.delete("/delete/:id", leadModule.deleteLead);

module.exports = router;
