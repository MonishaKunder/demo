var mongoose=require('mongoose')
var express   = require('express');
var bodyParser = require('body-parser');
var app       = express();

var db = mongoose.createConnection('mongodb://localhost:27017/leaveApp');

db.on('error', function (err) {
        // TODO: log it
        console.log(err);
        
    	});
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log("Req ip"+req.ip)
  console.log("Req path"+req.path)
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

var opt={'mongoose':mongoose,'db':db}

var holiday=require('./app/models/holiday.js')(opt)
var user=require('./app/models/user.js')(opt)
var leaveRecord= require('./app/models/leaveRecord.js')(opt)
var leaveType=require('./app/models/leaveType.js')(opt)
var schema={
	'holiday':holiday,
	'user':user,
	'leaveRecord':leaveRecord,
	'leaveType':leaveType
};

var holidayApi=require('./api/holiday.js')(app,opt,schema)
var applyLeaveApi=require('./api/applyLeave.js')(app,opt,schema)
var leaveSummaryApi=require('./api/leaveSummary.js')(app,opt,schema)
var leaveHistoryApi=require('./api/leaveHistory.js')(app,opt,schema)
var vacationApi=require('./api/vacationPlanner.js')(app,opt,schema)

var port     = process.env.PORT || 8888;
 


 
 process.on('uncaughtException',function(err){
 	console.log(err)
 })

app.listen(port);
console.log('listening to port' + port);