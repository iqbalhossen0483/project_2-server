const express = require("express");
const { mongoDb } = require("../mongoDb");
const { ObjectId } = require("mongodb");


const blogRouter = express.Router();
const client = mongoDb();

async function blogs() {
    try {
        await client.connect();
        const database = client.db("Tourism");
        const blogs = database.collection("blogs");

        blogRouter.post("/", async (req, res) => {
            const result = await blogs.insertOne(req.body);
            res.send(result);
        });
        blogRouter.get("/", async (req, res) => {
            const result = await blogs.find({}).toArray();
            res.send(result);
        });
        blogRouter.get("/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await blogs.findOne(query);
            res.send(result);
        });
    }
    finally {

    }
}
blogs();

module.exports = blogRouter;