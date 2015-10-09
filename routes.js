
 

module.exports = function(app) {
	app.get('/getdata',require('./models/getdata'));
    
    app.post('/applyLeave',require('./models/applyLeave'))

    app.get('/holidays',require('./models/getHolidays'))

    app.get('/leaveSummary',require('./models/getLeaveSummary'))

    app.get('/leaveHistory',require('./models/getLeaveHistory'))
}