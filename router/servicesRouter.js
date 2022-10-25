const express = require("express");
const router = express.Router();
const servicesModule = require("../module/servicesModules");

router.get("/get", servicesModule.getServices);

router.post("/create", servicesModule.createServices);

router.put("/update/:id", servicesModule.updateServices);

router.delete("/delete/:id", servicesModule.deleteServices);

module.exports = router;
