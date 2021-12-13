const express = require("express");
const { mongoDb } = require("../mongoDb");
const { ObjectId } = require('mongodb');

const serviceRouter = express.Router();
const client = mongoDb();

async function services() {
    try {
        await client.connect();
        const database = client.db("Tourism");
        const services = database.collection("services");

        serviceRouter.post("/", async (req, res) => {
            const service = req.body;
            const result = await services.insertOne(service);
            res.json(result)
        });
        //get
        serviceRouter.get("/", async (req, res) => {
            const cursor = services.find({});
            const result = await cursor.toArray();
            res.send(result);
        });
        serviceRouter.get("/:id", async (req, res) => {
            const id = req.params.id;
            const quary = { _id: ObjectId(id) };
            const result = await services.findOne(quary);
            res.send(result);
        })

    }
    finally {

    }
}
services();
module.exports = serviceRouter;