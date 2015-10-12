
 

module.exports = function(app) {
	app.get('/getdata',require('./models/getdata'));
    
    app.post('/leave',require('./models/applyLeave'))

    app.get('/holidays/:uniqueid',require('./models/getHolidays'))

    app.get('/leave-summary/:uniqueid',require('./models/getLeaveSummary'))

    app.get('/leave-history/:uniqueid/:status',require('./models/getLeaveHistory'))
}