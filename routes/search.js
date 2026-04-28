const express = require('express');
const { query } = require('../dbLogic/userDB');
const searchRouter = express.Router();

searchRouter.get("/:searchQuery", async (req, res) => {
    const { searchQuery } = req.params;

    if (!searchQuery) return res.json([]);

    try {
        const result = await query(
            `SELECT id, video_title, thumbnail_file_path
             FROM user_videos
             WHERE LOWER(video_title) LIKE LOWER($1)
             LIMIT 10`,
            [`%${searchQuery}%`]
        );

        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = {searchRouter};