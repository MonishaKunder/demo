
require('../schema');

module.exports=function(req,res){
  user.find({},{},function(err,docs){
  	if(err){
  		res.json({
  			status:"failure",
  			data:null,
  			error:err
  		})
  	}
  	else
  	{

       res.json({
  			status:"success",
  			data:docs,
  			error:null
  		})
  	}
   })
}
