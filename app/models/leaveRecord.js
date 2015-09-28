module.exports=function(opt){
    var mongoose=opt.mongoose;
    var db=opt.db;
    var leaveSchema=mongoose.Schema({
	   appliedOn: { type: Date, required: true, default: Date.now },
        to: { type: Date, required: true },
        from: { type: Date, required: true },
        type: { type: String, required: true },
        halfDay: { type: Boolean, required: true, default: false },
        applierId: { type: mongoose.Schema.Types.ObjectId, required: true },
        approverId: { type: mongoose.Schema.Types.ObjectId, required: true },
        reason: { type: String, required: true },
        noOfDays:{type:Number,required:true},
        status: { type: String, enum: ['approved', 'rejected', 'applied', 'cancelled'], default: 'applied', required: true }
	});

    leaveSchema.set('toJSON', {
        virtuals: true,
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            ret.from=ret.from.toString();
            ret.to=ret.to.toString();
            ret.appliedOn=ret.appliedOn.toString();
            delete ret._id;
            delete ret.__v;
        }
    })

// ensure virtual fields are serialised
    leaveSchema.set('toObject', {
        virtuals: true,
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            ret.from=ret.from.toString();
            ret.to=ret.to.toString();
            ret.appliedOn=ret.appliedOn.toString();
            delete ret._id;
            delete ret.__v;
        }
    })
   return db.model('leaverecord',leaveSchema);
}