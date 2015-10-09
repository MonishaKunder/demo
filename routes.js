var getData = require('./models/getdata');


module.exports = function(app) {
	app.get('/getdata',getData);
}