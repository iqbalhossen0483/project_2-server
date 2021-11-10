const express = require("express");
const { MongoClient, ObjectId } = require('mongodb');
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wewoq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("Tourism");
        const services = database.collection("services");
        const gallery = database.collection("gallery");
        const orders = database.collection("orders")

        app.post("/services", async (req, res) => {
            const service = req.body;
            const result = await services.insertOne(service);
            res.json(result)
        });
        //get
        app.get("/services", async (req, res) => {
            const cursor = services.find({});
            const result = await cursor.toArray();
            res.send(result);
        });

        // get gallery
        app.get("/gallery", async (req, res) => {
            const result = await gallery.find({}).toArray();
            res.send(result);
        })

        //post order
        app.post("/orders", async (req, res) => {
            const order = req.body;
            const result = await orders.insertOne(order);
            res.json(result);
        });
        //get orders
        app.get("/orders", async (req, res) => {
            const result = await orders.find({}).toArray();
            res.send(result)
        })

        //delele order
        app.delete("/orders/:id", async (req, res) => {
            const id = req.params.id;
            const quary = { _id: ObjectId(id) };
            const result = await orders.deleteOne(quary);
            res.send(result);
        });

        //approve order
        app.put("/orders/:id", async (req, res) => {
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
    } finally {
        // client.close();
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("its assignment 11 server");
})
app.listen(port, () => {
    console.log("its running")
})