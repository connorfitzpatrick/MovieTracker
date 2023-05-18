require("dotenv").config();

const express = require("express");
const db = require("./db")
const morgan = require("morgan")
const app = express();
const cors = require("cors")

// cors allows for two different domains to talk to eachother
app.use(cors());
app.use(express.json());

////////////////////
// ROUTE HANDLERS //
////////////////////

// get the top250 movies
app.get("/api/v1/movies", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM topmovies ORDER BY ranking desc");
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

// Get one of the top250 movies
app.get("/api/v1/movies/:id", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM topmovies WHERE id = $1", [
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

// add movie to list the top250 list (Not used in code)
app.post("/api/v1/movies", async (req, res) => {
    console.log(req.body);
    try {
        // parameterized query
        const results = await db.query(
            "INSERT INTO topmovies (movie_name, director, release_year, ranking, watched, in_top) values ($1, $2, $3, $4, $5, $6) returning *",
            [req.body.movie_name, req.body.director, req.body.release_year, req.body.ranking, 
                req.body.watched, req.body.in_top]
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

// update top250 movie list (not used in code)
app.put("/api/v1/movies/:id", async (req, res) => {
    try {
        const results = await db.query(
            "UPDATE topmovies SET movie_name = $1, director = $2, release_year = $3, ranking = $4, watched = $5, in_top = $6 WHERE id = $7 returning *",
            [req.body.movie_name, req.body.director, req.body.release_year, req.body.ranking, req.body.watched, req.body.in_top, req.params.id]
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

// Delete entry from top250 movie list (not used in code)
app.delete("/api/v1/movies/:id", async (req, res) => {
    try {
        const results = db.query("DELETE FROM topmovies WHERE id = $1", [req.params.id]);
        res.status(204).json({
            status: "success",
        });
    }  catch (err) {
        console.log(err);
    }
});

// get users personal list of movies
app.get("/api/v1/my_movies", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM mymovies ORDER BY movie_name desc");
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

app.get("/api/v1/my_movies/:id", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM mymovies WHERE id = $1", [
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

// add movie to my watchlist
app.post("/api/v1/my_movies", async (req, res) => {
    console.log(req.body);
    try {
        // parameterized query
        const results = await db.query(
            "INSERT INTO mymovies (movie_name, director, release_year, ranking, watched, in_top) values ($1, $2, $3, $4, $5, $6) returning *",
            [req.body.movie_name, req.body.director, req.body.release_year, req.body.ranking, 
                req.body.watched, req.body.in_top]
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

// update top250 movie list
app.put("/api/v1/my_movies/:id", async (req, res) => {
    try {
        const results = await db.query(
            "UPDATE mymovies SET movie_name = $1, director = $2, release_year = $3, ranking = $4, watched = $5, in_top = $6 WHERE id = $7 returning *",
            [req.body.movie_name, req.body.director, req.body.release_year, req.body.ranking, req.body.watched, req.body.in_top, req.params.id]
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

// Delete entry from my movie watchlist
app.delete("/api/v1/my_movies/:id", async (req, res) => {
    try {
        const results = db.query("DELETE FROM mymovies WHERE id = $1", [req.params.id]);
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