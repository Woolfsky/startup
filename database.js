const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const myCollection = db.collection('cards');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function updateDict(k, v) {
    const filter = {
        doc_identifier_ : "the one and only"
    };

    const updateDocument = {};
    updateDocument['$set'] = {
        [k]: v,
    };
    
    const result = await myCollection.updateOne(filter, updateDocument);
    return getDict();
}

async function getDict() {
    const cursor = await myCollection.find();
    const resultArray = await cursor.toArray();
    return resultArray[0];
}


module.exports = { getDict, updateDict };
