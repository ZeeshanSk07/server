const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/user');
const jobRoute = require('./routes/job');
const applicationRoute = require('./routes/application');
const cors = require('cors');
const dotenv = require('dotenv').config();


const Port = 4000;

const app = express();
app.use(cors());
app.use(express.json());
//what is synchronisation
//what is shell scripting? 
//cetails about ipaddress
//Whsat is sudo in linux?
//s




mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => {
        console.log('Error connecting to database:', err);
});

app.use('/user', user);
app.use('/job', jobRoute);
app.use('/application', applicationRoute);

app.use((err, req, res, next) => {
    console.error("Error occurred:", err); // Log error messages
    res.status(500).json({
        message: "An error occurred",
        error: err.message // Send back error details
    });
});

app.get('/health', (req, res) => {
    res.json({
        message: ' API is working fine',
        status: 'Working',
        date: new Date().toLocaleDateString()
    });
})



app.use("*", (req, res) => {
    res.status(404).json({
        message: 'Endpoint not found',
        status: 'Error',
    });
});
  
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
