var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');

var compress = require('compression');

app.use(compress({threshold:100})); 

app.use('/files',express.static(__dirname+'/files'))
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());

app.use(function(req, res, next) {
	
  console.log("Req ip"+req.ip)
  console.log("Req path"+req.path)
 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,uniqueid");
  next();
});

 process.on('uncaughtException',function(err){
 	console.log(err)
 })
 
require('./routes')(app);

mongoose.connect(config.mongourl,function(err,db) {
	if(err) {
		console.log(err);
	}
	else {
		app.listen(config.port,function() {
			console.log('The app is listening on port '+config.port);
		})
	}
})


