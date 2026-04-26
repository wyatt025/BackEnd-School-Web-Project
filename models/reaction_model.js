const { query } = require('../dbLogic/userDB');

const reactions = {
    getReactions(commentId, userName){
        return query(
            "SELECT * FROM comment_reactions WHERE comment_id = $1 AND user_name = $2",
            [commentId, userName]
        );
    },
    postReactions(commentId, userName, reaction){
        return query(
            "INSERT INTO comment_reactions (comment_id, user_name, reaction) VALUES ($1, $2, $3)",
            [commentId, userName, reaction]
        );
    },
    deleteReactions(commentId, userName){
        return query(
            "DELETE FROM comment_reactions WHERE comment_id = $1 AND user_name = $2",
            [commentId, userName]
        );
    },
    updateReactions(commentId, userName, reaction){
        return query(
            "UPDATE comment_reactions SET reaction = $1 WHERE comment_id = $2 AND user_name = $3",
            [reaction, commentId, userName]
        );
    },
    getAllReactions(commentId, username){
        return query(
            `SELECT 
            SUM(CASE WHEN reaction = 1 THEN 1 ELSE 0 END) AS likes,
            SUM(CASE WHEN reaction = 0 THEN 1 ELSE 0 END) AS dislikes,
            MAX(CASE WHEN user_name = $2 THEN reaction ELSE NULL END) AS userReaction 
            FROM comment_reactions WHERE comment_id = $1`,
            [commentId, username]
        );
    },


}
module.exports = reactions;