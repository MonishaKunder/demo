var mongoose = require('mongoose');

var userschema = new mongoose.Schema({
	personaldata : {},
	address : {},
    avatarUrl:String
})
/*
var editschema = new mongoose.Schema({
	userid: String,
	oldfields : [],
	newfields : [],
	timestamp : Date
})
*/
user = mongoose.model('dryfruit',userschema);


var holidaySchema=mongoose.Schema({
        name: String,
        date: {type: Date},
        type: { type: String, enum: ['mandatory', 'optional'], default: 'mandatory' },
        description: String,
        location: String,
  	    imgname:String
	
	})

    holidaySchema.set('toJSON', {
        virtuals: true,
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.location;
            delete ret.__v;
        }
    })

    // ensure virtual fields are serialised 
    holidaySchema.set('toObject', {
        virtuals: true,
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    })

 holiday=mongoose.model('holiday',holidaySchema);

 var leaveSchema=mongoose.Schema({
	   appliedOn: { type: Date, required: true, default: Date.now },
        to : {type : Object, required : true},
        from : {type:Object,required:true},
        type: { type: String, required: true },
        //halfDay: { type: Boolean, required: true, default: false },
        applier: {type: Object, required: true },
        approver: {type: Object, required: true },
        reason: { type: String, required: true },
        noOfDays:{type:Number,required:true},
        status: { type: String, enum: ['approved', 'rejected', 'applied', 'cancelled'], default: 'applied', required: true }
	});

    leaveSchema.set('toJSON', {
        virtuals: true,
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    })

// ensure virtual fields are serialised
    leaveSchema.set('toObject', {
        virtuals: true,
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    })

leaveRecord=mongoose.model('leave',leaveSchema);

var leaveTypeSchema=mongoose.Schema({
	   name: String,
        description: String,
        count: Number
	});

    leaveTypeSchema.set('toJSON', {
        virtuals: true,
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    })

// ensure virtual fields are serialised
    leaveTypeSchema.set('toObject', {
        virtuals: true,
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    })

leaveType=mongoose.model('leavetype',leaveTypeSchema);


