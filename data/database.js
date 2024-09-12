const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

const MONGODB_URI = "mongodb+srv://terminalnexa:terminalnexa2024@nexacluster.ddjqk.mongodb.net/nexa?retryWrites=true&w=majority";

async function connectToDatabase() {
    const client = await MongoClient.connect(MONGODB_URI);
    database = client.db('nexa');
}

function getDb() {
    if (!database) {
        throw new Error('Не е уште конектирана ДБ!');
    }
    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
};
