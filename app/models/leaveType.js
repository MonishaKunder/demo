module.exports=function(opt){
    var db=opt.db;
    var mongoose=opt.mongoose;
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
    db.model('leavetype',leaveTypeSchema);
}