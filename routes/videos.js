const express = require('express');
const { query } = require('../dbLogic/userDB');
const videosRouter = express.Router();

videosRouter.get("/", async (req, res) => {
    try {
        const result = await query(`
            SELECT 
                uv.id,
                uv.video_title,
                uv.description,
                uv.video_file_path,
                uv.thumbnail_file_path,
                uv.userID,
                tu.username,
                tu.email
            FROM user_videos uv
            JOIN test_users tu ON uv.userID = tu.id
        `);
        const rows = result? result.rows : [];
        res.status(200).json(rows);
    } catch (error) {
        res.statusMessage = error;
        res.status(500).json({error: error});
    };
});

// Add individual video endpoint
videosRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query(`
            SELECT 
                uv.id,
                uv.video_title,
                uv.description,
                uv.video_file_path,
                uv.thumbnail_file_path,
                uv.userID,
                tu.username,
                tu.email
            FROM user_videos uv
            JOIN test_users tu ON uv.userID = tu.id
            WHERE uv.id = $1
        `, [id]);
        const video = result?.rows?.[0] || null;
        res.status(200).json(video);
    } catch (error) {
        res.statusMessage = error;
        res.status(500).json({error: error});
    };
});

module.exports = {videosRouter};