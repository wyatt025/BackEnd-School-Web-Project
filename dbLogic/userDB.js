require('dotenv').config();
const { Pool } = require('pg');

// PostgreSQL connection pool
const openDB = () => {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: process.env.SSL,
        backendURL: process.env.BACKEND_URL
    });
    return pool;
};

const query = (sql,values=[]) => {
    return new Promise(async(resolve, reject) => {
        try {
            const pool = openDB();
            const result = await pool.query(sql, values);
            resolve(result);
        } catch (error) {
            reject(error.message);
        }
    })
};

module.exports = {query};