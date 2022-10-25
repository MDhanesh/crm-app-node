const mongo = require("../connect");
const { ObjectId } = require("mongodb");

module.exports.getLead = async (req, res) => {
  try {
    const employeedata = await mongo.selectedDB
      .collection("lead")
      .find()
      .toArray();
    res.send(employeedata);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
module.exports.updateLead = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = await mongo.selectedDB
      .collection("lead")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { ...req.body.lead } },
        { returnDocument: "after" }
      );
    res.send(updatedData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
module.exports.createLead = async (req, res) => {
  console.log("came");
  try {
    const insertedRseponse = await mongo.selectedDB
      .collection("lead")
      .insertOne(req.body.lead);
    res.send(insertedRseponse);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
module.exports.deleteLead = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedData = await mongo.selectedDB
      .collection("lead")
      .remove({ _id: ObjectId(id) });
    res.send(deletedData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
