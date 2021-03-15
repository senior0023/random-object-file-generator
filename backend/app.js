const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require("cors"); 

const config = require('./config/config');
const routes = require('./routes');

// Read the environment variables.
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use('/generatedFiles', express.static(path.join(__dirname, 'generatedFiles')));

// API Routes
app.use('', routes);

//Serve frontend build
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Catch unhandled rejections
process.on('unhandledRejection', err => {
    console.log('Unhandled rejection: ', err);
});
  
// Catch uncaught exceptions
process.on('uncaughtException', err => {
    console.log('Uncaught exception: ', err);
});

// Set the port and host for application
app.set('port', config.app.port);
app.set('host', config.app.host);

// Server listens on defined port and host
app.listen(app.get('port'), app.get('host'), () => {
  console.log(`Server started at ${app.get('host')}:${app.get('port')}`);
});