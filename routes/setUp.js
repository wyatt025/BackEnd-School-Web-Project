const express = require('express');
const { query } = require('../dbLogic/db');
const setUpRouter = express.Router();

setUpRouter.get("/", async (req, res) => {
    try {
        const result = await query('select * from test_users');
        const rows = result? result.rows : [];
        res.status(200).json(rows);
    } catch (error) {
        res.statusMessage = error;
        res.status(500).json({error: error});
    };
});

module.exports = {setUpRouter};