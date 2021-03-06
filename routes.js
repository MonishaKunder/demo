
 

module.exports = function(app) {

	app.post('/login',require('./models/login'))

	app.get('/getdata',require('./models/getdata'));
    
    app.post('/leave',require('./models/applyLeave'))

    app.get('/holidays',require('./models/getHolidays'))

    app.get('/leave-summary',require('./models/getLeaveSummary'))

    app.get('/leave-history',require('./models/getLeaveHistory'))

    app.get('/approve',require('./models/approve'));

    app.post('/viewinformation',require('./models/viewinformation'));

    app.post('/viewsearchinfo',require('./models/viewsearchinfo'));

    app.post('/viewconnections',require('./models/viewconnections'));

    app.post('/manageraction',require('./models/manageraction'))

    app.get('/users',require('./models/getUsers'))

   app.get('/getLocation',require('./models/getLocation'))

    app.get('/leave-history/:id',require('./models/getSapHistory'))
}

