// IMPORTS //
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('./config/db.js');
const path = require('path');
const State = require('./models/State.js');
const Bootcamp = require('./models/Bootcamp.js');
// REGULAR JS //
const PORT = 3000;
const app = express();


// ---------------------------------------------- START MIDDLEWARE ---------------------------------------------- //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());

// will happen on every request (taking away /server from path in production environment)
app.use((req, res, next) => {
    if (req.path.startsWith('/server')) {
        req.url = req.url.replace('/server', ''); // strip /server from the path
    }
    next();
});
// ---------------------------------------------- END MIDDLEWARE ---------------------------------------------- //


// ---------------------------------------------- START ROUTES ---------------------------------------------- //
app.use(express.static(path.join(__dirname, "../client/dist"))); //servering the React App


// CREATE ROUTES!!!
app.post("/", async (req, res) => {
    try {
        let dbResponse = await Bootcamp.create(req.body);
        res.status(201).send(dbResponse)
    } catch (error) {
        res.status(400).send("error creating new bootcamp")
    }
});


// READ ROUTES!!!
app.get("/", async (req, res) => {
    try {
        let dbResponse = await State.find();
        res.status(201).send(dbResponse)
    } catch (error) {
        res.status(400).send("error getting the states")
    }
});

app.get("/", async (req, res) => {
    try {
        let dbResponse = await Bootcamp.find().populate('stateId')
        res.status(201).send(dbResponse)
    } catch (error) {
        res.status(400).send("error creating new bootcamp")
    }
});

// UPDATE ROUTES!!!
app.put("/", async (req, res) => {
    try {
        let dbResponse = await Bootcamp.findByIdAndUpdate(req.params.bootcampId, req.body, { new: true }).populate("stateId");
        res.status(201).send(dbResponse);
        console.log('hitting update route');
    } catch (err) {
        res.status(400).send("error updating camp")
    }
});



// DELETE ROUTES!!!
app.delete("/", async (req, res) => {
    try {
        let dbResponse = await Bootcamp.findByIdAndDelete(req.params.bootcampId);
        res.status(201).send(dbResponse);
        console.log('hitting delete route');
    } catch (err) {
        console.error(err);  // Log the actual error
        res.status(401).send("error deleting camp: " + err.message);
    }
});




app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
// ---------------------------------------------- END ROUTES ---------------------------------------------- //


// activation of the server (i.e. making it listen on whatever port the PORT variable is set to above)
app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});