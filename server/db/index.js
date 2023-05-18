// import pool object of pg library
const { Pool } = require("pg");

const pool = new Pool();

// export the query object and passes on function to pool.query
module.exports = {
    query: (text, params) => pool.query(text, params),
};