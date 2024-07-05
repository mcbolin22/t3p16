// Declare and configure the server


const express = require("express");
const serverInstance = express();

// Raw JSON in body allowed
serverInstance.use(express.json());
// Form data in body allowed
serverInstance.use(express.urlencoded({extended: true}));

const {readAuthData, verifyAuthData} = require("./middleware/authentication.js")

serverInstance.use(readAuthData, verifyAuthData);


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

serverInstance.post("/", (request, response) => {

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