const express = require('express');
const cors = require('cors');
require('dotenv').config();




const app = express();

const port = process.env.APP_PORT || 5000;


app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})