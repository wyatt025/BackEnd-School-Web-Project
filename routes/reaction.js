const express = require("express");
const reactionRouter = express.Router();
const reactions = require('../models/reaction_model');

reactionRouter.post("/", async (req, res) => {
  try {
    const { commentId, userName, reaction } = req.body; 
    const result = await reactions.getReactions(commentId, userName);

    if (result.rows.length === 0) {
      await reactions.postReactions(commentId, userName, reaction);
      return res.json({ message: "Reaction added" });
    }

    const existing = result.rows[0];

    if (existing.reaction === reaction) {
      await reactions.deleteReactions(commentId, userName);
      return res.json({ message: "Reaction removed" });
    } else {
      await reactions.updateReactions(commentId, userName, reaction);
      return res.json({ message: "Reaction updated" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

reactionRouter.get("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { userName } = req.query;

  try {
    const result = await reactions.getAllReactions(commentId, userName);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = {reactionRouter};