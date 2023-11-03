// IMPORTS //
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('./config/db.js');
const path = require('path');
const Bootcamp = require('./models/Movie.js');
const { default: axios } = require('axios');
// REGULAR JS //
const PORT = 3000;
const app = express();
const API_KEY = process.env.API_KEY;


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
app.use(express.static(path.join(__dirname, "../client/dist"))); //servering the React App
// ---------------------------------------------- END MIDDLEWARE ---------------------------------------------- //


// ---------------------------------------------- START ROUTES ---------------------------------------------- //


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
app.get("/movies:searchTerm", async (req, res) => {
    let movieToFind = req.params.searchTerm
    if (!movieToFind) {
        console.error("no input recieved");
        return;
    }
    try {
        const APIresponse = await axios(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${movieToFind}`);
        console.log("APIResponse", APIresponse.data);
        res.status(201).send(APIresponse.data)
    } catch (e) {
        console.error(e);
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
// app.put("/", async (req, res) => {
//     try {
//         let dbResponse = await Bootcamp.findByIdAndUpdate(req.params.bootcampId, req.body, { new: true }).populate();
//         res.status(201).send(dbResponse);
//         console.log('hitting update route');
//     } catch (err) {
//         res.status(400).send("error updating camp")
//     }
// });



// DELETE ROUTES!!!
app.delete("/", async (req, res) => {
    try {
        let dbResponse = await Bootcamp.findByIdAndDelete();
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