var getData = require('./models/getdata');
 

module.exports = function(app) {
	app.get('/getdata',getData);
    
    app.post('/applyLeave',require('./models/applyLeave'))

    app.get('/holidays',require('./models/getHolidays'))

    app.get('/leaveSummary',require('./models/getLeaveSummary'))

    app.get('/leaveHistory',require('./models/getLeaveHistory'))
}