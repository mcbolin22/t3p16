// Declare and configure the server


const express = require("express");
const serverInstance = express();
const {body, validationResult} = require("express-validator");


// Raw JSON in body allowed
serverInstance.use(express.json());
// Form data in body allowed
serverInstance.use(express.urlencoded({extended: true}));




const PokemonRouter = require("./routers/pokemonRouters")

// Use to enable post requests (Raw JSON)
serverInstance.use(express.json());
// Form data in body allowed
serverInstance.use(express.urlencoded({extended: true}))

serverInstance.get("/", (request, response) => {
    console.log("Someone visited the homepage of the server");

    response.json({
        message: "Hello world! Modified message again!"
    });
});

serverInstance.post(
    "/", // path
    body("username").notEmpty().isLength({min: 4, max: 10}), // middleware in route chain
    (request, response) => { // final stop in route chain

        const errors = validationResult(request);
        if (!errors.isEmpty()){ // checks if any errors at all in username field 400 = user error
            response.status(400).json({
                message:"Bad username!",
                errors: errors.array()
            });
        }

        console.log(request.body);

        response.json({
            message:"Received data:",
            requestData: request.body
        })
});

serverInstance.put("/", (request, resoponse) => {
    this.response.json({message:"Put request received"})
});

serverInstance.patch("/", (request, resoponse) => {
    this.response.json({message:"Patch request received"})
});

serverInstance.delete("/", (request, resoponse) => {
    this.response.json({message:"Delete request received"})
});

// Every route that begins with /pokemon gets passed to PokemonRouter
serverInstance.use("/pokemon", PokemonRouter);



// Make the instance available for other files to use
module.exports = serverInstance;