
require('../schema');
 var request=require('request')

module.exports=function(req,res){	
		
	var id=req.params.id;
	var options={
 		'url':'http://192.168.1.149:50000/CWECC/user/BPM/getEmployeeData/'+id,
 		headers:{
 			'Content-Type':'application/json'
 		},
 		method:'GET'
 	}

 request(options,function (err, response) {
       if(err)
				{
					res.json({
						status:"failure",
						err:err,
						data:null
					})
					console.log(err)
				}
		else
		{
       		var obj=JSON.parse(response.body);
       		res.json({
				status:"success",
				err:null,
				data:obj.empDetails
			})
      
    }
})
}
		
		