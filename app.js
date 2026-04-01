require('dotenv').config();
const express = require('express');
const cors = require('cors');
const publicPath = require('path').join(__dirname, '/videos');
const {usersRouter} = require('./routes/users');
const {videosRouter} = require('./routes/videos');

const app = express();
app.use(cors());
app.use('/', usersRouter);
app.use('/videos', videosRouter);
app.use(express.static(publicPath));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});