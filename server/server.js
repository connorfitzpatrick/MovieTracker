require("dotenv").config();

const express = require("express");
const db = require("./db")
const morgan = require("morgan")
const app = express();
const cors = require("cors")

app.use(cors());
app.use(express.json());

// get all movies
app.get("/api/v1/movies", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM movies");
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
app.post("/api/v1/movies", async (req, res) => {
    console.log(req.body);
    try {
        const results = await db.query(
            "INSERT INTO movies (movie_name, director, imdb_rating, tomatoes_critics, tomatoes_audience, watched) values ($1, $2, $3, $4, $5, $6) returning *",
            [req.body.movie_name, req.body.director, req.body.imdb_rating, req.body.tomatoes_critics, 
                req.body.tomatoes_audience, req.body.watched]
        );
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                movie: results.rows[0],
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// update movie
app.put("/api/v1/movies/:id", async (req, res) => {
    try {
        const results = await db.query(
            "UPDATE Movies SET movie_name = $1, director = $2, imdb_rating = $3, tomatoes_critics = $4, tomatoes_audience = $5, watched = $6 WHERE id = $7 returning *",
            [req.body.movie_name, req.body.director, req.body.imdb_rating, req.body.tomatoes_critics, req.body.tomatoes_audience, req.body.watched, req.params.id]
        );
        res.status(200).json({
            status: "success",
            data: {
                movie: results.rows[0],
            }
        });
    } catch (err) {
        console.log(err);
    }
});

app.delete("/api/v1/movies/:id", async (req, res) => {
    try {
        const results = db.query("DELETE FROM movies WHERE id = $1", [req.params.id]);
        res.status(204).json({
            status: "success",
        });
    }  catch (err) {
        console.log(err);
    }
});

// http://localhost:3005/api/v1/movies
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up on ${port}`)
});