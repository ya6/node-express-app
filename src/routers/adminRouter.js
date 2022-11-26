const express = require("express");
const { MongoClient } = require("mongodb");
const adminRouter = express.Router();
const sessionsData = require("../../data/sessions.json");
const debug = require("debug")("app:adminRouter");
const {MONGO_CONNECTION_STRING} = require('../../config/config')


adminRouter.route("/").get((req, res) => {
  const url = MONGO_CONNECTION_STRING;
  const dbName = "nodeapp";
  const collection = "sessions";
  
  (async function mongo() {
    let client;
    try {
        client =await MongoClient.connect(url)
        debug('connected to mongo');
        const db = client.db(dbName)
        const response = await db.collection(collection).insertMany(sessionsData)
        res.json(response)
    } catch (error) {
        debug(error.stack)
    }
    
  })()

});



module.exports = adminRouter;
