const { query } = require('../dbLogic/userDB');

const comments = {
        getComments(videoId) {
        return query(
            "SELECT * FROM comments WHERE video_id=$1 ORDER BY created_at DESC",
            [videoId]
        );
    },
    postComment(video_id, user_name, content) {
        return query(
            "INSERT INTO comments(video_id, user_name, content) VALUES($1, $2, $3)",
            [video_id, user_name, content]
        );
    },

}
module.exports = comments;