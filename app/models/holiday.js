module.exports=function(opt){
    var db=opt.db;
    var mongoose=opt.mongoose;
    var holidaySchema=mongoose.Schema({
        name: {type:String,required:true},
        date: {type: Date,required:true},
        type: { type: String, enum: ['mandatory', 'optional'], default: 'mandatory' },
        description: String,
        location:{type:Number,required:true}

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
    return db.model('holiday',holidaySchema)
}
