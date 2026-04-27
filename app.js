require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const {usersRouter} = require('./routes/users');
const {videosRouter} = require('./routes/videos');
const {commentRouter} = require("./routes/comments");
const {reactionRouter} = require("./routes/reaction");
const {uploadsRouter} = require("./routes/uploads");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/videos', express.static(path.join(__dirname, 'videos')));
app.use('/videoIMG', express.static(path.join(__dirname, 'videoIMG')));
app.use('/', usersRouter);
app.use('/api/videos', videosRouter);
app.use("/api/comments", commentRouter);
app.use("/api/reactions", reactionRouter);
app.use("/api/upload", uploadsRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
