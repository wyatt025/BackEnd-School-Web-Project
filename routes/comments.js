const express = require("express");
const { query } = require('../dbLogic/userDB');

const commentRouter = express.Router();

// GET comments
commentRouter.get("/:videoId", async (req, res) => {
    try {
        const { videoId } = req.params;

        const result = await query(
            "SELECT * FROM comments WHERE video_id=$1 ORDER BY created_at DESC",
            [videoId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// POST comment
commentRouter.post("/", async (req, res) => {
    try {
        const { video_id, user_name, content } = req.body;
        if(req.user_name === null) {
        return res.status(403).json({ message: "Please log in or sign up to add a comment" });
        }
    await query(
        "INSERT INTO comments(video_id, user_name, content) VALUES($1, $2, $3)",
        [video_id, user_name, content]
        );
    res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = {commentRouter};