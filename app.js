const express = require('express');
const {MongoClient} = require('mongodb');
const cors = require("cors");


const path = require('path');
const app = express(),
    bodyParser = require("body-parser");
const Pusher = require("pusher");
port = 3080;
app.use(cors());

const uri = "mongodb://mongo:4wB7x7d3qfsUZXGhG8UF@containers-us-west-18.railway.app:6311";
const client = new MongoClient(uri);


async function getEvents() {
    try {
        await client.connect();
        const database = client.db('test');
        const collection = database.collection('events');

        return await collection.find().toArray();
    } catch (e) {
        console.error(e);
        return [];
    } finally {
        await client.close();
    }
}

app.get('/api/events', async (req, res) => {
    const events = await getEvents();
    //console.log('Events:', events)

    res.json(events);
});


app.post('/api/penis', async (req, res) => {

    console.log(req.body)
    const Pusher = require("pusher");

    const pusher = new Pusher({
        appId: "1534008",
        key: "5bca62ed4d7914057704",
        secret: "11d25e806268994430be",
        cluster: "eu",
        useTLS: true,
    });

    pusher.trigger("my-channel", "my-event", {
        message: "hello world",
    });
    res.json('ok')
})


app.use(express.static(path.join(__dirname, '.')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});


app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});