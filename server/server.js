require("dotenv").config();

const express = require("express");
const morgan = require("morgan")
const app = express();

app.use(express.json());

// get all movies
app.get("/api/v1/movies", (req, res) => {
    console.log("route handler ran"),
    res.status(200).json({
        status: "success",
        data: ({
            movies: ["The Prestige", "Predator"],
        }),
    });
});

// Get one movie
app.get("/api/v1/movies/:id", (req, res) => {
    console.log(req.params);
    res.status(200).json({
        status: "success",
        data: {
            movie: ["The Prestige", "Shrek"],
        },
    });
});

// add movie to list
app.post("/api/v1/movies", (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: "success",
        data: {
            movie: "Shrek"
        }
    });
});

// update movie
app.put("/api/v1/movies/:id", (req, res) => {
    console.log("Post Method Works")
    console.log(req.params.id);
    console.log(req.body);
    res.status(201).json({
        status: "success",
        data: {
            movie: "Shrek"
        }
    })
});

console.log("test");
// http://localhost:3001/getMovies

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up on ${port}`)
})