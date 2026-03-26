require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {setUpRouter} = require('./routes/setUp');

const app = express();
app.use(cors());
app.use('/', setUpRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});