const express = require("express");
const { mongoDb } = require("../mongoDb");


const orderRouter = express.Router();
const client = mongoDb();

async function orders() {
    try {
        await client.connect();
        const database = client.db("Tourism");
        const orders = database.collection("orders")

        orderRouter.post("/", async (req, res) => {
            const order = req.body;
            const result = await orders.insertOne(order);
            res.json(result);
        });
        //get orders
        orderRouter.get("/", async (req, res) => {
            const result = await orders.find({}).toArray();
            res.send(result)
        });

        //delele order
        orderRouter.delete("/:id", async (req, res) => {
            const id = req.params.id;
            const quary = { _id: ObjectId(id) };
            const result = await orders.deleteOne(quary);
            res.send(result);
        });

        //approve order
        orderRouter.put("/:id", async (req, res) => {
            const id = req.params.id;
            const quary = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    status: "approved"
                },
            };
            const result = await orders.updateOne(quary, updateDoc, options);
            res.send(result);
        })
    }
    finally {

    }
};

orders();
module.exports = orderRouter;