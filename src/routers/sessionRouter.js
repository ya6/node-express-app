const express = require("express");
const sessionRouter = express.Router();
const { MongoClient, ObjectId } = require("mongodb");
const debug = require("debug")("app:sessionRouter");
const { MONGO_CONNECTION_STRING } = require("../../config/config");


  
//   sessionRouter.route("/:id").get((req, res) => {
//     const id = req.params.id;
//     res.render('single', {session: sessions[id]});
//   });

  sessionRouter.route("/").get((req, res) => {
    const url = MONGO_CONNECTION_STRING;
    const dbName = "nodeapp";
    const collection = "sessions";
  
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("connected to mongo");
        const db = client.db(dbName);
        const sessions = await db.collection(collection).find().toArray();
       res.render("sessions", { sessions });
      } catch (error) {
        debug(error.stack);
      }
       client.close();
    })();
  });

  sessionRouter.route("/:id").get((req, res) => {
    const id = req.params.id;
    const url = MONGO_CONNECTION_STRING;
    const dbName = "nodeapp";
    const collection = "sessions";
  
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("connected to mongo");
        const db = client.db(dbName);
        const session = await db.collection(collection).findOne({_id: new ObjectId(id)});
       res.render("single", { session });
      } catch (error) {
        debug(error.stack);
      }
       client.close();
    })();
  });

  module.exports = sessionRouter