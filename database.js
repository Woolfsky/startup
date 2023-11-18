const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const myCollection = db.collection('cards');
const userCollection = db.collection('users');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
    return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);

    return user;
}

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


module.exports = { 
    getDict, 
    updateDict,
    getUser,
    getUserByToken,
    createUser
};

// Note, I should probaly store users in a dictionary within the db so that people can't override keys like page_username with their login credentials on accident
