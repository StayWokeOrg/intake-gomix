'use strict';

var firebase = require('firebase');
var Promise = require('promise');
var express = require('express');
var app = express();
var serverStartTime = Math.floor(new Date() / 1);

// [START initialize]
// Initialize the app with a service account, granting admin privileges
firebase.initializeApp({
  databaseURL: 'https://'+process.env.PROJECT_ID+'.firebaseio.com',
  serviceAccount: {
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY
  }
});
// [END initialize]

// Set our simple Express server to serve up our front-end files
app.use(express.static('public'));
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// Listen for HTTP requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});