// IMPORTS //
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('./config/db.js');
const path = require('path');
const Movie = require('./models/Movie.js');
const User = require('./models/User.js')
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
app.post("/signup", async (req, res) => {
    try {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        User.create({ ...req.body, password: hashedPassword });
    } catch (error) {
        res.status(400).send("error in signup", error)
    }
});

app.post('/login', async (req, res) => {
    // use model to put user in collection
    // should get the email and pass in the req.body
    // 1. get the user with this email
    let dbUser = await User.findOne({userName: req.body.userName});
    // compare
    // 2. compare entered password with pass of this user
    if (!dbUser) return res.status(400).send("email or password incorrect");

    bcrypt.compare(req.body.password, dbUser.password, (err, isMatch) => { 
        if (isMatch) {
            // let the frontend know that the login was successful!
            // dont want password
            dbUser.password = "";
            // now just email and username
            const token = jwt.sign({dbUser}, process.env.TOKEN_SECRET, { expiresIn: "24h" });
            res.status(200).send({token, dbUser});
            // log them in ( on frontend can do certain things, get info related to account, can do BACKEND stuff related to their account, permissions for CRUD functionality related to their account, allow only certain users to do certain things )
        } else {
            res.status(400).send("email or password incorrect")
        }
    })
});


// READ ROUTES!!!

// get all reviews
app.get("/", async (req, res) => {
    try {
        let dbResponse = await Bootcamp.find().populate('stateId')
        res.status(201).send(dbResponse)
    } catch (error) {
        res.status(400).send("error creating new bootcamp")
    }
});

// search for movies route
app.get("/movies:searchTerm", async (req, res) => {
    let movieToFind = req.params.searchTerm
    if (!movieToFind) {
        console.error("no input recieved");
        return;
    }
    try {
        const APIresponse = await axios(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${movieToFind}`);
        console.log("APIResponse", APIresponse.data);
        res.status(201).send(APIresponse.data)
    } catch (e) {
        console.error(e);
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