const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();




const app = express();
app.use(express.json());

const port = process.env.APP_PORT || 5000;
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connection established'))
    .catch(error => console.log(error));


app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})




// ,
// "Image": " ",
// "brand": "ZENITH",
// "name": " ",
// "price": " $"


