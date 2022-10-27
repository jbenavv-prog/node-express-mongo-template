const { MongoClient } = require("mongodb");
require('dotenv').config();

 

class PetService {
    constructor(){
        this.client = new MongoClient(process.env.MONGODB_URI);
        this.dataBase = this.client.db('animals');
    }

    async getPets(){
        const collection = this.dataBase.collection('pet');
        const result = await collection.find().toArray();
        return result;
    }
}

module.exports = PetService;