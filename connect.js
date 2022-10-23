const { MongoClient } = require("mongodb");

module.exports = {
  selectedDB: {},
  async connect() {
    try {
      const client = await MongoClient.connect(process.env.MONGODB_URL);
      this.selectedDB = client.db("CRM");
      // console.log(this.selectedDB);
    } catch (err) {
      console.log(err);
    }
  },
};
