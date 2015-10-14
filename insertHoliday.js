var mongoose   = require('mongoose');
mongoose.connect("mongodb://localhost:27017/leaveApp");
var db=mongoose.connection;



require('./schema')



db.on('error', function (err) {
        // TODO: log it
        console.log(err);
        
    });

var obj=[
{name: "Janmashtmi",
    date: new Date('2015-09-05').toISOString(),
    type: "optional",
    description: "janmashtmi",
    location:"bangalore",
imgname: "/files/pictures/janmashtami.jpg"},
    {name: "Ganesh Chaturthi",
    date: new Date('2015-09-17').toISOString(),
    type: "mandatory",
    description: "Ganesh Chaturthi",
    location:"bangalore",
imgname : "/files/pictures/ganeshchaturthi.jpg"},
    {name: "Bakrid",
    date: new Date('2015-09-25').toISOString(),
    type: "optional",
    description: "Bakrid",
    location:"bangalore",
imgname: "/files/pictures/bakrid.jpg"},
    {name: "Mahatma Gandhi jayanti",
    date: new Date('2015-10-02').toISOString(),
    type: "mandatory",
    description: "Mahatma Gandhi jayanti",
    location:"bangalore",
imgname: "/files/pictures/gandhi-jayanti.jpg"},
    {name: "Dussehra",
    date: new Date('2015-10-22').toISOString(),
    type: "mandatory",
    description: "Dussehra",
    location:"bangalore",
imgname: "/files/pictures/dushehra.jpg"},
    
     {name: "Muharram",
    date: new Date('2015-10-24').toISOString(),
    type: "optional",
    description: "Muharram",
    location:"bangalore",
imgname: "/files/pictures/muharram.jpg"},
{name: "Naraka Chaturdasi",
    date: new Date('2015-11-10').toISOString(),
    type: "optional",
    description: "Naraka Chaturdasi",
    location:"bangalore",
imgname: "/files/pictures/narak-chaturdashi.jpg"},
{name: "Diwali",
    date: new Date('2015-11-11').toISOString(),
    type: "mandatory",
    description: "Diwali",
    location:"bangalore",
imgname: "/files/pictures/diwali.jpg"},
{name: "Guru Nanak Jayanti",
    date: new Date('2015-11-25').toISOString(),
    type: "optional",
    description: "Guru Nanak Jayanti",
    location:"bangalore",
imgname: "/files/pictures/gurunanak.jpg"},
{name: "Christmas",
    date: new Date('2015-12-25').toISOString(),
    type: "mandatory",
    description: "Christmas",
    location:"bangalore",
imgname: "/files/pictures/christmas.jpg"}
]
db.once('open',function(){
for(var i=0;i<obj.length;i++)
{
	var h=new holiday(obj[i])
	h.save(function(err){
		if(err)
			console.log(err)
		console.log("Saved")
	})
}
})
 
