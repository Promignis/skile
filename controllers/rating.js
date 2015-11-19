var Link = require('../models/Link');

exports.postRating = function(req, res){
	var id = req.body.id;
	var value = req.body.ratingVal;
	Link.update({_id:id},{$set: {rating: value}}, function(err, result){
		if(err){
			res.send("e");
		}else{
			res.send(result);
		}
	});
}