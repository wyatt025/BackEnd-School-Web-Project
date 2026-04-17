const express = require("express");
const router = express.Router();
const db = require("../dbLogic/userDB");
// GET comments
router.get("/:videoId", async (req, res) => {
    const { videoId } = req.params;

    const result = await db.query(
        "SELECT * FROM comments WHERE video_id=$1 ORDER BY created_at DESC",
        [videoId]
    );

    res.json(result.rows);
});

// POST comment
router.post("/", async (req, res) => {
    const { video_id, user_name, content } = req.body;

    await db.query(
        "INSERT INTO comments(video_id, user_name, content) VALUES($1, $2, $3)",
        [video_id, user_name, content]
    );

    res.sendStatus(201);
});

module.exports = router;