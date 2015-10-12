
 

module.exports = function(app) {
	app.get('/getdata',require('./models/getdata'));
    
    app.post('/leave',require('./models/applyLeave'))

    app.post('/holidays',require('./models/getHolidays'))

    app.post('/leave-summary',require('./models/getLeaveSummary'))

    app.post('/leave-history',require('./models/getLeaveHistory'))
}