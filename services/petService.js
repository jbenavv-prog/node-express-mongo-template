const { MongoClient } = require("mongodb");
require("dotenv").config();

class PetService {
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI);
    this.dataBase = this.client.db("animals");
  }

  async getPets() {
    const collection = this.dataBase.collection("pet");
    const result = await collection.find().toArray();
    return result;
  }

  async getSpeciesPets() {
    const collection = this.dataBase.collection("pet");
    const result = await collection
      .aggregate([
        {
          $lookup: {
            from: "species",
            localField: "id_specie",
            foreignField: "id_specie",
            as: "specieDetails",
          },
        },
      ])
      .toArray();

    return result;
  }

  async insertPet() {
    const count = await this.counter();
    const collection = this.dataBase.collection("pet");
    const result = collection.insertOne({
      id_pet: count.seq_value,
      name: "Pancha",
      id_specie: 13,
    });

    return result;
  }

  async counter() {
    const collection = this.dataBase.collection("counters");
    const result = await collection.findOneAndUpdate(
      { _id: "petCount" },
      { $inc: { seq_value: 1 } }
    );

    return result.value;
  }
}

module.exports = PetService;
