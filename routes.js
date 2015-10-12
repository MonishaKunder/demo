
 

module.exports = function(app) {
	app.get('/getdata',require('./models/getdata'));
    
    app.post('/leave',require('./models/applyLeave'))

    app.get('/holidays',require('./models/getHolidays'))

    app.get('/leave-summary',require('./models/getLeaveSummary'))

    app.get('/leave-history',require('./models/getLeaveHistory'))
}
