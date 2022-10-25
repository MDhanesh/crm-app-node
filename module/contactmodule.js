const mongo = require("../connect");
const { ObjectId } = require("mongodb");
module.exports.getContact = async (req, res, next) => {
  try {
    const contactdata = await mongo.selectedDB
      .collection("products")
      .find()
      .toArray();
    res.send(contactdata);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
module.exports.updateContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = await mongo.selectedDB
      .collection("products")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { ...req.body.Contact } },
        { returnDocument: "after" }
      );
    res.send(updatedData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
module.exports.createContact = async (req, res, next) => {
  console.log("came");
  try {
    const insertedRseponse = await mongo.selectedDB
      .collection("products")
      .insertOne(req.body.products);
    res.send(insertedRseponse);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
module.exports.deleteContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedData = await mongo.selectedDB
      .collection("products")
      .remove({ _id: ObjectId(id) });
    res.send(deletedData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
