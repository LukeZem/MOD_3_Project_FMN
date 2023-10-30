// IMPORTS //
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
require('./config/db.js');
const path = require('path');
const State = require('./models/State.js');
// REGULAR JS //
const PORT = 3000;
const app = express();


// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());
app.use((req, res, next) => {
    if (req.path.startsWith('/server')) {
        req.url = req.url.replace('/server', ''); // strip /server from the path
    }
    next();
});
// END MIDDLEWARE //


// START ROUTES //
app.use(express.static(path.join(__dirname, "../client/dist"))); //servering the React App

//CREATE BOOTCAMP ROUTE

//READ BOOTCAMPS ROUTE



//READ STATES ROUTE
app.get("/states", async (req, res) => {
    try {
        let dbResponse = await State.find();
        res.status(201).send(dbResponse)
    } catch (error) {
        res.status(400).send("error getting the states")
    }
});








app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
// END ROUTES //


app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});