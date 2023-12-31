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

    // let _username = email.split("@")[0]
    // let updateObject = {};
    // updateObject[_username] = JSON.stringify({tasks:[]});

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4()
    };
    await userCollection.insertOne(user);
    await updateDict(email, JSON.stringify({tasks:[]}))

    return user;
}

async function updateDict(k, v) {
    const filter = {
        email : k
    };
    const updateDocument = {};
    updateDocument['$set'] = {
        [k.split("@")[0]]: v,
    };
    const result = await userCollection.updateOne(filter, updateDocument);
    return getDict(k);
}

async function getDict(userName) {
    const filter = { email: userName }
    const cursor = await userCollection.find(filter);
    const resultArray = await cursor.toArray();
    return resultArray;
}


module.exports = { 
    getDict, 
    updateDict,
    getUser,
    getUserByToken,
    createUser
};
