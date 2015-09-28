module.exports=function(opt){
    var db=opt.db;
    var mongoose=opt.mongoose;
    var userSchema=mongoose.Schema({
	   firstName: { type: String, required: true },
        middleName: String,
        lastName: { type: String, required: true },
        employeeId: { type: String, required: true },
        password: { type: String, required: true },
        reportingTo: mongoose.Schema.Types.ObjectId,
        leaves:[{
            type:{type:String,required:true},
            description:{type:String},
            count:{type:Number,required:true,default:0}
        }],
	   location:Number
	});
    userSchema.set('toJSON', {
        virtuals: true,
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    })

// ensure virtual fields are serialised
    userSchema.set('toObject', {
        virtuals: true,
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    })
    return db.model('user',userSchema);
}

// ObjectId("55f27377c48a778c16ae4ad6")
 //ObjectId("55f27377c48a778c16ae4ad7")