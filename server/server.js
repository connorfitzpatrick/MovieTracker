require("dotenv").config();

const express = require("express");
const db = require("./db")
const morgan = require("morgan")
const app = express();

app.use(express.json());

// get all movies
app.get("/api/v1/movies", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM movies");
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: ({
                movies: results.rows,
            }),
        });
    } catch (err) {
        console.log(err);
    }
    
});

// Get one movie
app.get("/api/v1/movies/:id", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM movies WHERE id = $1", [
            req.params.id,
        ]);
        res.status(200).json({
            status: "success",
            data: {
                movie: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
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
    console.log("Post Method Works");
    console.log(req.params.id);
    console.log(req.body);
    res.status(201).json({
        status: "success",
        data: {
            movie: "Shrek"
        }
    });
});

app.delete("/api/v1/movies/:id", (req, res) => {
    res.status(204).json({
        status: "success",
    }); 
});

// http://localhost:3005/api/v1/movies
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up on ${port}`)
});