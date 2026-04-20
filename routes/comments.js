const express = require("express");
const { query } = require('../dbLogic/userDB');

const commentRouter = express.Router();

// GET comments
commentRouter.get("/:videoId", async (req, res) => {
    const { videoId } = req.params;

    const result = await query(
        "SELECT * FROM comments WHERE video_id=$1 ORDER BY created_at DESC",
        [videoId]
    );

    res.json(result.rows);
});

// POST comment
commentRouter.post("/", async (req, res) => {
    if(request.user_name != username) {
        return response.status(403).json("You dont have privilages");
    }
    const { video_id, user_name, content } = req.body;

    await query(
        "INSERT INTO comments(video_id, user_name, content) VALUES($1, $2, $3)",
        [video_id, user_name, content]
    );

    res.sendStatus(201);
});

module.exports = {commentRouter};