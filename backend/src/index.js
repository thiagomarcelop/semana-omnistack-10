const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebSocket } = require('./websocket.js');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://<USERNAME>:<PASSWORD>@cluster0-ksq2j.mongodb.net/<MONGO-DB-NAME>?retryWrites=true&w=majority',  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);