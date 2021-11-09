const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//BodyParser middleware setup
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

//Database configuration
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true}
    ).then(
        () => console.log("MongoDB successfully connected!")
    ).catch(
        err => console.log(err)
    );

//process.env.port is for Heroku deployment, 5000 is for dev
const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}!`));