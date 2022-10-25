const mongo = require("../connect");
const { ObjectId } = require("mongodb");

module.exports.getServices = async (req, res) => {
  try {
    const employeedata = await mongo.selectedDB
      .collection("services")
      .find()
      .toArray();
    res.send(employeedata);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
module.exports.updateServices = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = await mongo.selectedDB
      .collection("services")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { ...req.body.services } },
        { returnDocument: "after" }
      );
    res.send(updatedData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
module.exports.createServices = async (req, res) => {
  console.log("came");
  try {
    const insertedRseponse = await mongo.selectedDB
      .collection("services")
      .insertOne(req.body.services);
    res.send(insertedRseponse);
    console.log("came");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
module.exports.deleteServices = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedData = await mongo.selectedDB
      .collection("services")
      .remove({ _id: ObjectId(id) });
    res.send(deletedData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
