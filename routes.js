
 

module.exports = function(app) {
	app.get('/getdata',require('./models/getdata'));
    
    app.post('/applyLeave',require('./models/applyLeave'))

    app.post('/holidays',require('./models/getHolidays'))

    app.post('/leaveSummary',require('./models/getLeaveSummary'))

    app.post('/leaveHistory',require('./models/getLeaveHistory'))
}