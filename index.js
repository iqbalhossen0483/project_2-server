const express = require("express");
const cors = require("cors");
const { mongoDb } = require("./mongoDb");
const serviceRouter = require("./router/services");
const gallaryRouter = require("./router/gallery");
const orderRouter = require("./router/order");
const blogRouter = require("./router/blog");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//database
const client = mongoDb();

async function run() {
    try {
        await client.connect();

        //services
        app.use("/services", serviceRouter);

        //gallery
        app.use("/gallery", gallaryRouter);

        //order
        app.use("/orders", orderRouter);

        //blog
        app.use("/blogs", blogRouter);

    } finally {
        // client.close()
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("its assignment 11 server");
})
app.listen(port, () => {
    console.log("its running")
})