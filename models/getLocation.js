require('../schema');

module.exports=function(req,res){
  user.find({},{'address.latitude':1,'address.longitude':1},function(err,docs){
  	if(err){
  		res.json({
  			status:"failure",
  			data:null,
  			error:err
  		})
  	}
  	else
  	{
      var data=[]
       for(var i=0;i<docs.length;i++)
       {
          data.push(docs[i].address)
       }
       res.json({
  			status:"success",
  			data:data,
  			error:null
  		})
  	}
   })
}