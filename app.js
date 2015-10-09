var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');

require('./routes')(app);

mongoose.connect(config.mongourl,function(err,db) {
	if(err) {
		console.log(err);
	}
	else {
		app.listen(config.port,function() {
			console.log('The app is listening on port 3000');
		})
	}
})


