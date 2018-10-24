// modules =================================================
var express        = require('express');
var app            = express();
// configuration ===========================================

// config files
var config = require('./config/node');
// set our port
var path = require('path');
global.appRoot = path.resolve(__dirname) + config.staticDir;

app.start = function() { 
    console.log("starting");
    
    app.use(express.static(__dirname + '/images', { maxAge: 365 }));
    app.all('/', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });
    // set the static files location /public/img will be /img for users
    app.use(express.static('.')); 
    console.log("express static loaded");
    // start app ===============================================
    // startup our app at http://localhost:8080
    app.listen(config.port);
    // shoutout to the user                     
    console.log('Magic happens on port ' + config.port);    
    

}

app.stop = function() {
    app.close();
}
// expose app           
exports = module.exports = app;    