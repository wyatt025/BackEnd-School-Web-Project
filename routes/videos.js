const express = require('express');
const { query } = require('../dbLogic/userDB');
const videosRouter = express.Router();

videosRouter.get("/", async (req, res) => {
    try {
        const result = await query('select * from user_videos');
        const rows = result? result.rows : [];
        res.status(200).json(rows);
    } catch (error) {
        res.statusMessage = error;
        res.status(500).json({error: error});
    };
});

module.exports = {videosRouter};