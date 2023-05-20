const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const productRuter = require('./routers/Product');
const userRoutes = require('./routers/User')



const app = express();
app.use(express.json());



const port = process.env.APP_PORT || 5000;
app.use(cors())

app.use('/products', productRuter);
app.use('/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connection established'))
    .catch(error => console.log(error));


app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})





