const express = require("express");
const { mongoDb } = require("../mongoDb");


const gallaryRouter = express.Router();
const client = mongoDb();

async function gallery() {
    try {
        await client.connect();
        const database = client.db("Tourism");
        const gallery = database.collection("gallery");

        gallaryRouter.get("/", async (req, res) => {
            const result = await gallery.find({}).toArray();
            res.send(result);
        });
    }
    finally {

    }
};
gallery();
module.exports = gallaryRouter;