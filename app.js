require('dotenv').config();
const express = require('express');

const app = express();
const salonRouter = require('./api/salons/salon_router');

const port = process.env.PORT || 3000;
//const port =  3000;
app.use(express.json());

app.use('/api/salons', salonRouter);



app.listen(port, () => {
    console.log('Server up and running on PORT: ', port);
});


module.exports = app;
