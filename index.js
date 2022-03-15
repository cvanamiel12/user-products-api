const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 3010;
const app = express();

//connect our routes module
const userRoutes = require('./routes/userRoutes')
const productRoutes = require ('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//prevents blocking of requests from client esp diff domains
app.use(cors())

//connect database to server
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log (`Connected to database`));


//routes
    //create a middleware to be the root url of all routes
app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)






app.listen(PORT, () => console.log(`Server is connected to port ${PORT}`))